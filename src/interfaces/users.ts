import type { Property } from "./property";

export interface User {
  _id:string,
  properties:Property[]
  userName: string;
  email: string;
  role: {
    name: string;
  };
  avatar: {
    secure_url: string;
  };
}