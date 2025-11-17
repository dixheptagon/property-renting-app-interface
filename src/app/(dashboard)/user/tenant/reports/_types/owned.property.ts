// Types for Get Owned Properties API

export interface OwnedProperty {
  id: number;
  uid: string;
  title: string;
}

export interface OwnedPropertiesData {
  properties: OwnedProperty[];
}

export interface OwnedPropertiesResponse {
  success: boolean;
  message: string;
  data: OwnedPropertiesData;
}
