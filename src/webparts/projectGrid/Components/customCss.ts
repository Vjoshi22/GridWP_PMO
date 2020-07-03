import  * as $ from 'jquery'
import { SPComponentLoader } from "@microsoft/sp-loader";
import { DateTimeFieldFormatType } from 'sp-pnp-js';
import { table } from "./getItems";


SPComponentLoader.loadCss("//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css");
SPComponentLoader.loadCss("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js");
SPComponentLoader.loadCss("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js");
SPComponentLoader.loadCss("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.7.14/js/bootstrap-datetimepicker.min.js");
SPComponentLoader.loadCss("https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css")
import 'jqueryui';


export function _customStyle(){
    $(document).ready(function(){
        
        
        // $('#_plannedCompletion').datepicker();
        // $('#FilesTable_filter label').text("");
        $('#FilesTable th').css({'min-width':'130px'});
        // $('#FilesTable_length').addClass('col-md-6');
        // $('.dataTables_filter').addClass('col-md-6');
        $('.dataTables_filter input').addClass('form-control');
        $('.dataTables_length label').addClass('col-form-label');
        // $('.dataTables_length select').addClass('form-control');
        //$('#btnDiv').css("margin-left", "30%");
        $('#_plannedCompletion, #_plannedStart').css({
            'padding-right':'14px',
            'padding-left':'14px'
        });
        //$('#FilesTable thead').css({"background":"#e7eff9","background-image ": "linear-gradient(0deg, #e7eff9 0%, #cfd6e6 74%)"});
        $('#newItemDiv').css({
            "margin-left": "96px"
        });
        let _span = `<span style="color:red"> *</span>`
        $(".required").append(_span);
        // $('input-group input').css({
        //     'margin-left': '1rem'
        // });
        // $('input-group-addon').css({
        //     'margin-right': '-2rem'
        // });
        // $('input-group-addon span').css({
        //     'margin-left': '-6px'
        // })
        
        
       
        //Pre-pending the Button for new item
        let newItemButton = `<div class="col-2"><button type="button" id="btn_newProject" class="btn btn-primary">Create Project</button><br/><br/></div>`;
        //$('.dataGrid').prepend(newItemButton);
       // $('#FilesTable_length').before(newItemButton);
        $('.dataGrid').before(newItemButton);
        //$('#FilesTable_filter').hide();
        //$('#FilesTable_filter').after('<div id="customSearch" style="float:right" class="col-4"><input id="search3" class="form-control" Placeholder="Search" type="text"/></div>')
        $('#btnDiv').css({
            'text-align':'center',
            'width':'84%'
        });
        $('#FilesTable thead').append('<tr id="columnSearch"></tr>');
        $('#FilesTable thead th').each( function () {
            var title = $(this).text();
            $('#columnSearch').append( '<th><input type="text" class="colSearchInputs" id="'+title+'" placeholder="Search '+title+'" /></th>' );
        } );

        //search for all columns
        $( '.colSearchInputs').on( 'keyup change', function () {
                table
                    .column($(this).closest('th').index())
                    .search( (<any>this).value )
                    .draw();
            });
        // $('#btn_newProject').css({
            
        //     'height': '42px'
        // })
    });
}