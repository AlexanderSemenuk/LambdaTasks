
export interface RequestBody {
    language: string;
    mimetype: 'none' | 'doc' | 'docx' | 'rtf' | 'other';
    count: number;
  }
  
  export interface ResponseData {
    price: number;
    time: number;
    deadline: number;
    'deadline_date': string;
  }