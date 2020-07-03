import "datatables.net";
import "datatables.net-dt";
import "datatables.net-responsive";
import { SPComponentLoader } from "@microsoft/sp-loader";
import {
    SPHttpClient,
    SPHttpClientResponse,   
    ISPHttpClientOptions
  } from '@microsoft/sp-http';
import * as $ from "jquery";


import { ISPList } from "../ProjectGridWebPart";

export var table;

SPComponentLoader.loadCss("https://code.jquery.com/jquery-3.5.1.js");
SPComponentLoader.loadCss(
    "https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"
);
SPComponentLoader.loadCss(
  "https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js"
);
SPComponentLoader.loadCss("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css");
//SPComponentLoader.loadCss("https://cdn.datatables.net/1.10.21/css/dataTables.bootstrap4.min.css");
SPComponentLoader.loadCss("https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css");
SPComponentLoader.loadCss("https://cdn.datatables.net/fixedheader/3.1.7/js/dataTables.fixedHeader.min.js");
SPComponentLoader.loadCss("https://cdn.datatables.net/fixedheader/3.1.7/css/fixedHeader.dataTables.min.css");

export function _getallItems(url: string, currentContext: any, absoluteURL: any): Promise<ISPList[]>{
    $('.dataGrid').empty();
    let requestURL = absoluteURL.concat(url);
    
    return currentContext.spHttpClient.get(requestURL,
        SPHttpClient.configurations.v1)
        .then(response=>{
          return response.json();
        }).then(jsonresponse =>{
           return jsonresponse.value;
           console.log(jsonresponse.value);
        }) as Promise<ISPList[]>
}

export function _populateGrid(results){
    $('.dataGrid').append(GenerateTablefromJSON(results));

   table =  $('#FilesTable').DataTable({
              "order": [[0, "desc" ]]
    });
}
function GenerateTablefromJSON(data){
    var tablecontent = 
    '<table id="FilesTable" class="table table-hover table-responsive" cellspacing="0" width="100%">' +
    '<thead class=""><tr>' +
    "<th>ID</th>" +
    "<th>RMS Id</th>" +
    "<th>CRM Id</th>" +
    "<th>Business Group</th>" +
    "<th>Project Name</th>" +
    "<th>Client Name</th>" +
    "<th>Delivery Manager</th>" +
    "<th>Project Manager</th>" +
    "<th>Project Type</th>" +
    "<th>Prj. Roll Out Strategy</th>" +
    "<th>Planned Start</th>" +
    "<th>Planned Completion</th>" +
    "<th>Project Location</th>" +
    "<th>Project Budget</th>" +
    "<th>Work Status</th>" +
    "<th>Action</th>" +
    "</tr></thead>";

    for (var i = 0; i < data.length; i++) {
        tablecontent += '<tr id="' + data[i].ProjectID_RMS + 'row">';
        tablecontent += '<td id="' + data[i].Id + 'rowItem">' + data[i].Id + "</td>";
        tablecontent += '<td id="' + data[i].Id + 'rowItem">' + data[i].ProjectID_RMS + "</td>";
        tablecontent += '<td id="' + data[i].ProjectName + 'row">' + data[i].ProjectID_SalesCRM + "</td>";
        tablecontent += '<td id="' + data[i].ClientName + 'row">' + data[i].BusinessGroup + "</td>";
        tablecontent += '<td id="' + data[i].ProjectID_RMS + 'row">' + data[i].ProjectName + "</td>";
        tablecontent += '<td id="' + data[i].ProjectID_RMS + 'row">' + data[i].ClientName + "</td>";
        tablecontent += '<td id="' + data[i].ProjectID_RMS + 'row">' + data[i].DeliveryManager + "</td>";
        tablecontent += '<td id="' + data[i].ProjectID_RMS + 'row">' + data[i].ProjectManager + "</td>";
        tablecontent += '<td id="' + data[i].ProjectID_RMS + 'row">' + data[i].ProjectType + "</td>";
        tablecontent += '<td id="' + data[i].ProjectID_RMS + 'row">' + data[i].ProjectRollOutStrategy + "</td>";
        tablecontent += '<td id="' + data[i].ProjectID_RMS + 'row">' + data[i].PlannedStart + "</td>";
        tablecontent += '<td id="' + data[i].ProjectID_RMS + 'row">' + data[i].PlannedCompletion + "</td>";
        tablecontent += '<td id="' + data[i].ProjectID_RMS + 'row">' + data[i].ProjectLocation + "</td>";
        tablecontent += '<td id="' + data[i].ProjectID_RMS + 'row">' + data[i].ProjectBudget + "</td>";
        tablecontent += '<td id="' + data[i].ProjectID_RMS + 'row">' + data[i].ProjectStatus + "</td>";
        tablecontent += "<td id='" + data[i].Id + "rowItem'><a id='" + data[i].Id +
        "' target='_blank' style='color: orange' class='confirmEditFileLink'>" +
        "<i class='glyphicon glyphicon-pencil' title='Edit File'></i></a>&nbsp&nbsp&nbsp;&nbsp;";
        tablecontent +=
        "<a id='" +
        data[i].Id +
        "' style='color: red' class='confirmDeleteFileLink'>" +
        "<i class='glyphicon glyphicon-remove' title='Delete File'></i></a>&nbsp&nbsp";
        tablecontent += "<a id='" + data[i].Id + "' href='#' class='confirmListItemDetailsLink'>" +
                  "</a></td>";
                  tablecontent += '</tr>';
    }
    return tablecontent
}