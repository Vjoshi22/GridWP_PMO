import { SPHttpClient, ISPHttpClientOptions, SPHttpClientConfiguration  ,SPHttpClientResponse} from "@microsoft/sp-http";
import { ExtensionContext } from '@microsoft/sp-extension-base';
import { ISPList } from "../ProjectGridWebPart";
import { _getallItems, _populateGrid } from "./getItems";
import { _customStyle } from "./customCss";



export var var_validate: boolean = false;

export function _validate(): boolean{

     var ProjectID_RMS =  $('input#_RMSID').val();
     var ProjectID_SalesCRM = $('input#_CRMID').val();
     var BusinessGroup= $('select#_businessGroup').val();
     var ProjectName= $('input#_projectName').val();
     var ClientName= $('input#_clientName').val();
     var ProjectManager= $('select#_projectManager').val();
     var ProjectType= $('select#_projectType').val();
     var ProjectRollOutStrategy= $('select#_projectRollOut').val();
     var PlannedStart= $('input#_plannedStart').val();
     var PlannedCompletion= $('input#_plannedCompletion').val();
     var ProjectDescription= $('textarea#_projectDescription').val();
     var ProjectLocation= $('input#_location').val();
     var ProjectBudget= $('input#_budget').val();
     var ProjectStatus= $('select#_projectStatus').val();

     if((ProjectID_RMS =="" || ProjectID_RMS == "null") || (ProjectLocation =="" || ProjectLocation == "null")){
        return var_validate = false;
     }else{
        return var_validate =true
     }

}