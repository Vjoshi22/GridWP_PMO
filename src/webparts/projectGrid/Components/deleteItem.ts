import { SPHttpClient, ISPHttpClientOptions, SPHttpClientConfiguration  ,SPHttpClientResponse} from "@microsoft/sp-http";
import { ExtensionContext } from '@microsoft/sp-extension-base';
import { ISPList } from "../ProjectGridWebPart";
import { _getallItems, _populateGrid } from "./getItems";
import { _customStyle } from "./customCss";

export function _deleteItem(context: any, curr_ItemID){
    if (!window.confirm('Are you sure you want to delete the latest item?')) {  
        return;  
      }
   //let etag: string = undefined; 
   const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Project Details')/items(`+ curr_ItemID +`)`;
   const options: ISPHttpClientOptions = {
    headers: {
        'Accept': 'application/json;odata=nometadata',
        'Content-type': 'application/json;odata=verbose',
        'odata-version': '',
        'IF-MATCH': "*",
        'X-HTTP-Method': 'DELETE'
      }
   };

   return context.spHttpClient.post(url, SPHttpClient.configurations.v1, options).
      then((response: SPHttpClientResponse) => {
         if (response.status === 200){
            location.reload(true);
            alert("Item Deleted Successfully");

        }else 
        {
            alert(response.status)
        } 
    });
   }