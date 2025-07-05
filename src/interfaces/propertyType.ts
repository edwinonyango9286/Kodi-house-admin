export interface PropertyTypePayload {
  _id?:string
  name: string;
  status: string;
  description: string;
}

export interface PropertyType {
  _id:string,
  id:string,
  name:string,
  slug:string,
  createdAt:Date,
  status:string,
  description:string,
  createdBy:{
    userName:string
  }
}
