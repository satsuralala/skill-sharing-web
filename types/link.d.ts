declare module '@editorjs/link' {
    interface LinkToolData {
      link: string;
      meta: {
        title?: string;
        description?: string;
        image?: string;
      };
    }
  
    export default class Link {
      constructor(config: { data: LinkToolData; api: any; readOnly: boolean });
    }
  }
  