export interface Session {
  id: number;
  dateTimeStart: string;
  dateTimeEnd: string;
  name: string;
  location: string;
  description: [{name:string, link:string}];
  speakerIds: number[];
  tracks: string[];
  phone: string;
}
