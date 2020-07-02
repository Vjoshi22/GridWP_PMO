import {
    SPHttpClient,
    SPHttpClientResponse,   
    ISPHttpClientOptions
  } from '@microsoft/sp-http';

var CurrentUser;
var TestOwnerUsers: string="";
var matchResult;

export function getcurrentuser(PageContext){
  //get the current user context
  PageContext.spHttpClient.get(`${PageContext.pageContext.web.absoluteUrl}/_api/SP.UserProfiles.PeopleManager/GetMyProperties`,
  SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) =>{
    response.json().then((responseJSON: any) => { 
    //console.log(responseJSON);
    console.log(responseJSON.DisplayName)
    CurrentUser = responseJSON.DisplayName;
    getuserGroup(PageContext, CurrentUser)
    })
  });
}
export function getuserGroup(PageContext, CurrentUser){
    //Get the user from a group
    PageContext.spHttpClient.get(`${PageContext.pageContext.web.absoluteUrl}/_api/web/sitegroups/getbyname('Owners')/users?select=Title`,
    SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) =>{
      console.log("logging response" + response);
       response.json().then((rjson: any) => { 
            console.log("Group Name")
            console.log(JSON.stringify(rjson.value))
            rjson.value.forEach((getUser: any) => {
                    console.log(getUser.Title);
                    TestOwnerUsers=`${getUser.Title}`;
                    if(TestOwnerUsers == CurrentUser){
                        $('.dataGrid').hide();
                    }else{
                        $('.dataGrid').show();
                    }
                    matchResult = TestOwnerUsers.match('/' + CurrentUser + '/g');
                    alert(matchResult);
                    console.log(matchResult);
                    /*for(var i=0; i<=response.json.length; i++){
            
                    
                    TestOwnerUsers[i] = `${getUser.Title}`
                    console.log(TestOwnerUsers[1])
                  }*/
            });
       });  
     });
}
