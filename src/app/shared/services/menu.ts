export interface Menu {
    //?: is a way to assign null value if no value is present
    path?: string;
    title?: string;
    icon?: string;
    type?: string;
    active?: boolean;
    children?: Menu[];//because menu can be nested menu inside menu i.e. Menu[]
  
  }