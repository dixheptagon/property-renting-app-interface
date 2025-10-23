// Types
export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  category: string;
  image: string;
}

export const dummyProperties: Property[] = [
  {
    id: "1",
    name: "Cozy Mountain Cabin",
    location: "Switzerland, Zurich",
    price: 1500000,
    rating: 4.8,
    category: "House",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: "2",
    name: "Luxury Beach Villa",
    location: "Spain, Barcelona",
    price: 720000,
    rating: 4.9,
    category: "Villa",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: "3",
    name: "Modern City Apartment",
    location: "USA, New York",
    price: 350000,
    rating: 4.6,
    category: "Apartment",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: "4",
    name: "Rustic Forest Lodge",
    location: "Canada, Vancouver",
    price: 1800000,
    rating: 4.7,
    category: "House",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: "5",
    name: "Elegant Hotel Suite",
    location: "France, Paris",
    price: 550000,
    rating: 4.5,
    category: "Hotel",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: "6",
    name: "Charming Countryside Cottage",
    location: "UK, London",
    price: 1200000,
    rating: 4.4,
    category: "House",
    image:
      "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: "7",
    name: "Seaside Resort Room",
    location: "Australia, Sydney",
    price: 2200000,
    rating: 4.8,
    category: "Room",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: "8",
    name: "Historic Townhouse",
    location: "Italy, Rome",
    price: 950000,
    rating: 4.6,
    category: "House",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
];
