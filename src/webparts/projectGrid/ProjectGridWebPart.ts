import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from "@microsoft/sp-loader";
import styles from './ProjectGridWebPart.module.scss';
import * as strings from 'ProjectGridWebPartStrings';
import NewItem from "./Components/NewItem";
import { _getallItems,_populateGrid} from "./Components/getItems";
import { _customStyle } from "./Components/customCss";
import { _createNewItem } from "./Components/createNewItem";
import { _deleteItem } from './Components/deleteItem';
// import { _edititem, _saveditData } from './Components/editItems';
import { var_validate, _validate } from "./Components/validateItems";
import { GetParameterValues } from "./Components/getQueryString";
import { getcurrentuser } from "./Components/getCurrentUserGroup";


import "datatables.net";
import "datatables.net-dt";
import "datatables.net-responsive";
import { peoplepicker } from "sp-peoplepicker";

/**
 * specific Imports
 */
import pnp, { sp, Item, ItemAddResult, ItemUpdateResult, Web } from 'sp-pnp-js';
import * as $ from 'jquery';
SPComponentLoader.loadCss("https://cdn.jsdelivr.net/npm/sp-peoplepicker@0.10.0/sp-peoplepicker.min.js");
let cssURL = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
SPComponentLoader.loadCss(cssURL);
SPComponentLoader.loadCss("https://ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js");

/**
 * Imports ends
 */

export var var_editCheck: string ="new";
export var var_editItemID: number;

export interface IProjectGridWebPartProps {
  description: string;
  listName: string;
}

export interface ISPList{
  ProjectID_RMS: string;
  ProjectID_SalesCRM: string;
  BusinessGroup: string;
  ProjectName: string;
  ClientName: string;
  DeliveryManager: string;
  ProjectManager: string;
  ProjectType: string;
  ProjectRollOutStrategy: string;
  PlannedStart: string;
  PlannedCompletion: string;
  ProjectDescription: string;
  ProjectLocation: string;
  ProjectBudget: string;
  ProjectStatus: string;
}

export default class ProjectGridWebPart extends BaseClientSideWebPart <IProjectGridWebPartProps> {

  public render(): void {
    
  SPComponentLoader.loadCss("https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css");
  SPComponentLoader.loadCss("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js");
  SPComponentLoader.loadCss("//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css");
  SPComponentLoader.loadScript("https://github.com/pnp/PnP/blob/master/Components/Core.JQuery/Core.JQueryWeb/Scripts/PnP/sp.peoplepicker.js");

    //getcurrentuser(this.context);
    this.domElement.innerHTML = NewItem.NewHTMLTemplate;
    $('#newProject').hide();
    let url = "/_api/web/Lists/GetByTitle('Project Details')/items?$select =*&$orderby=Id desc";
    let currentContext = this.context;
    if ((!/new/.test(window.location.href))) {
      if((!/edit/.test(window.location.href))){
        _getallItems(url, this.context, this.context.pageContext.web.absoluteUrl).then((results)=>{
          _populateGrid(results);
          _customStyle(); 
          });
      }
    // _getallItems(url, this.context, this.context.pageContext.web.absoluteUrl).then((results)=>{
    // _populateGrid(results);
    // _customStyle(); 
    // });
  }
    // (<any>$('#deliveryManager_pp')).spPeoplePicker({
    //   minSearchTriggerLength: 2,
    //   maximumEntitySuggestions: 10,
    //   principalType: 1,
    //   principalSource: 15,
    //   searchPrefix: '',
    //   searchSuffix: '',
    //   displayResultCount: 6,
    //   maxSelectedUsers: 1
    // });

   $(document).ready(function(){

     //opne new item form in new tab
    // if (/new/.test(window.location.href)) {
    //   $('#FilesTable_wrapper').hide()
    //   //$(this).hide();
    //   $('.webPartContainer').hide();
    //   $('#newItemDiv, #newProject').show();
    //   _customStyle(); 
    // }
    // else if (/edit/.test(window.location.href)) {
    //     var_editCheck = "edit";
    //     $('#FilesTable_wrapper').hide()
    //     $('#newItemDiv, #newProject').show();
    //     $('#btn_newProject').hide();
    //     $('.webPartContainer').hide();
    //     var id_edit =  GetParameterValues('id')
    //     if(id_edit){
    //       _edititem(currentContext, id_edit);
    //   }
      _customStyle(); 

    // }else{
    //   $('#newItemDiv, #newProject').hide();
    //   $('.webPartContainer').hide();
    // }

    $(document).on("click", "#btn_newProject", function (e) {
      var newquery = "new"
      let winURL = 'https://ytpl.sharepoint.com/sites/yashpmo/SitePages/Project-Creation.aspx?page=' + newquery;
      //let winURL = "https://yashtechinc9.sharepoint.com/sites/PMO/_layouts/15/workbench.aspx?page=" + newquery;
      window.open(winURL, "_self");
      
    });
    
    //delete item on cross button click
    $(document).on("click", ".confirmDeleteFileLink", function (e) {
      _deleteItem(currentContext, this.id);
      _getallItems(url, currentContext, currentContext.pageContext.web.absoluteUrl).then((results)=>{
        _populateGrid(results);
        _customStyle(); 
      });
    });

    //edit item on edit items click
    $(document).on("click", ".confirmEditFileLink", function (e) {
      var_editCheck ="edit";
      var newquery = "edit";
      let winURL = 'https://ytpl.sharepoint.com/sites/yashpmo/SitePages/EditItem.aspx?page=' + newquery + `,id=`+ this.id;
      //let winURL = 'https://yashtechinc9.sharepoint.com/sites/PMO/_layouts/15/workbench.aspx?page=' + newquery + `,id=`+ this.id;
      window.open(
        winURL,
        '_self' // <- This is what makes it open in a new window.
      );
    });

    //Cancel on Cancel button click
    $(document).on("click", "#btn_Cancel", function (e) {
      let winURL = 'https://ytpl.sharepoint.com/sites/yashpmo/SitePages/Projects.aspx';
      window.open(
        winURL,
        '_self' // <- This is what makes it open in a new window.
      );
      // $('#FilesTable_wrapper').show()
      // $('#btn_newProject').show();
      // $('#newItemDiv, #newProject').hide();
    });

    //submit item on submit button click
    $(document).on("click", "#btn_Submit", function (e) {
      _validate();
      if(var_editCheck == "new" && var_validate ==true ){
      _createNewItem(currentContext);
      // _getallItems(url, currentContext, currentContext.pageContext.web.absoluteUrl).then((results)=>{
      //   _populateGrid(results);
      //   _customStyle(); 
      //   });
      //   $('#FilesTable_wrapper').show()
      //   $('#btn_newProject').show();
      //   $('#newItemDiv, #newProject').hide();
      }else if(var_editCheck == "edit" && var_validate == true){
        var id_edit =  GetParameterValues('id')
        if(id_edit){
        //  _saveditData(currentContext, id_edit);
      }
      
      // $('#FilesTable_wrapper').show()
      // $('#btn_newProject').show();
      // $('#newItemDiv, #newProject').hide();
      }
    });
   })
   
  }
  
  protected get dataVersion(): Version {
  return Version.parse('1.0');
}

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    pages: [
      {
        header: {
          description: strings.PropertyPaneDescription
        },
        groups: [
          {
            groupName: strings.BasicGroupName,
            groupFields: [
              PropertyPaneTextField('description', {
                label: strings.DescriptionFieldLabel
              }),
              PropertyPaneTextField('listName',{
                label: strings.ListNameLabel
              })
            ]
          }
        ]
      }
    ]
  };
}
}
