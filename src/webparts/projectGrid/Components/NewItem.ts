import { SPComponentLoader } from "@microsoft/sp-loader";
import * as styles from "../ProjectGridWebPart.module.scss";

require('../ProjectGridWebPart.module.scss');
SPComponentLoader.loadCss(
  "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
);
SPComponentLoader.loadCss("https://code.jquery.com/jquery-3.5.1.js");
SPComponentLoader.loadCss("https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js");
SPComponentLoader.loadCss("//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css");


require('../ProjectGridWebPart.module.scss');
export default class Newitem {
  public static NewHTMLTemplate: string = `
  <div class="dataGrid">
  </div>
`
      
}
