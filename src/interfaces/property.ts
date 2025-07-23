export interface Property {
  _id: string;
  createdBy: {
    userName: string;
  };
  id: string;
  name: string;
  propertyName:string;
  type: string;
  numberOfUnits: number;
  occupiedUnits: number;
  currentStatus: string;
  category: string;
  images: Array<{
    secure_url: string;
    public_id: string;
    _id: string;
  }>;
  isDeleted:boolean;
}
