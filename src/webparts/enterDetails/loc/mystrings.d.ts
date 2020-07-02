declare interface IEnterDetailsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'EnterDetailsWebPartStrings' {
  const strings: IEnterDetailsWebPartStrings;
  export = strings;
}
declare module '*.scss' {
  const content: {[className: string]: string};
  export default content;
}