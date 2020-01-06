export interface Speaker {
  id: number;
  name: string;
  profilePic: string;
  twitter: string;
  about: [{name: string, descr: string ,foto: [string]}];
  location: string;
  email: string;
  phone: string;
}
