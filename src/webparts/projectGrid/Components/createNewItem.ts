import { SPHttpClient, ISPHttpClientOptions, SPHttpClientConfiguration  ,SPHttpClientResponse} from "@microsoft/sp-http";
import { ExtensionContext } from '@microsoft/sp-extension-base';
import { ISPList } from "../ProjectGridWebPart";
import { _getallItems, _populateGrid } from "./getItems";
import { _customStyle } from "./customCss";



export function _createNewItem(context: any): void {
  const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Project Details')/items`;
 var RMSID = $('input#_clientName').val(); 
 RMSID = "null" ? "-": $('input#_RMSID').val();
  const options: ISPHttpClientOptions = {
    headers: {
      "Accept": "application/json;odata=verbose",
      "Content-Type": "application/json;odata=verbose",
      "OData-Version": "" //Really important to specify
    },
    body: JSON.stringify({
      __metadata: { type: 'SP.Data.Project_x0020_DetailsListItem' },
      ProjectID_RMS: $('input#_RMSID').val(),
      ProjectID_SalesCRM: $('input#_CRMID').val(),
      BusinessGroup: $('select#_businessGroup').val(),  
      ProjectName: $('input#_projectName').val(),
      ClientName: $('input#_clientName').val(),
      ProjectManager: $('select#_projectManager').val(),
      ProjectType: $('select#_projectType').val(),
      ProjectRollOutStrategy: $('select#_projectRollOut').val(),
      PlannedStart: $('input#inpt_plannedStart').val(),
      PlannedCompletion: $('input#inpt_plannedCompletion').val(),
      ProjectDescription: $('textarea#_projectDescription').val(),
      ProjectLocation: $('input#_location').val(),
      ProjectBudget: $('input#_budget').val(),
      ProjectStatus: $('select#_projectStatus').val()
    })
  };

  return context.spHttpClient.post(url, SPHttpClient.configurations.v1, options).then(response => {
      
      if(response.ok){
        
        // $('#FilesTable_wrapper').show()
        // $('#btn_newProject').show();
        // $('#newItemDiv, #newProject').hide();
        // let winURL = 'https://ytpl.sharepoint.com/sites/yashpmo/SitePages/Projects.aspx';
        // window.open(winURL,'_self');
        alert("Item successfully Created");
        return response.json();
    }
  });
}