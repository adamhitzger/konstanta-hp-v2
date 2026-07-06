export interface ActionResponse<T> {
  success: boolean
  message: string;
  errors?: {
      [K in keyof T]?: string[];
    };
  inputs?: T 
}

export interface Contact {
      name: string;
      email: string;
      tel: string;
      company: string;
      msg: string;
    
}
