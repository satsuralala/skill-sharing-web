declare module '@editorjs/checklist' {
  interface ChecklistItem {
    text: string;
    checked: boolean;
  }

  interface ChecklistData {
    items: ChecklistItem[];
  }

  export default class Checklist {
    constructor(config: { 
      data: ChecklistData; 
      api: any; 
      readOnly: boolean; 
    });
  }
}
