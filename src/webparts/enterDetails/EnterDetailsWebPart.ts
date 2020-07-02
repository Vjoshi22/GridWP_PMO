import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";

import * as strings from 'EnterDetailsWebPartStrings';
import EnterDetails from './components/EnterDetails';
import { IEnterDetailsProps } from './components/IEnterDetailsProps';
import { GetParameterValues } from '../projectGrid/Components/getQueryString';
// import { _edititem } from '../projectGrid/Components/editItems';


export interface IEnterDetailsWebPartProps {
  description: string;
  currentContext: WebPartContext;
}

export default class EnterDetailsWebPart extends BaseClientSideWebPart <IEnterDetailsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IEnterDetailsProps> = React.createElement(
      EnterDetails,
      {
        description: this.properties.description,
        currentContext: this.context
      }
    );

    ReactDom.render(element, this.domElement);
    // var itemId = GetParameterValues('id');
    // _edititem(this.context, itemId)
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
