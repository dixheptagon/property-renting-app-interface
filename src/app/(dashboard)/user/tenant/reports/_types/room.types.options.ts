export interface RoomTypeOption {
  id: number;
  uid: string;
  name: string;
}

export interface RoomTypesOptionsData {
  rooms: RoomTypeOption[];
}

export interface RoomTypesOptionsResponse {
  success: boolean;
  message: string;
  data: RoomTypesOptionsData;
}

export interface RoomTypesOptionsParams {
  propertyUid: string;
}
