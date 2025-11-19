import { Tenant } from "./property";

export interface PropertyProfileProps {
  title: string;
  rating: number;
  description: string;
  host: Tenant;
  category: string;
  reviews: number;
  address: string;
  image?: string;
}
