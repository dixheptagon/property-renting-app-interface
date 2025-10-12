import { NextRequest } from "next/server";

// Dummy data for property details
const dummyProperty = {
  id: 1,
  uid: "prop-001",
  user_id: 1,
  category: "apartment" as const,
  title: "Cozy Modern Apartment in Jakarta",
  description:
    "A beautifully designed apartment located in the heart of Jakarta, featuring modern amenities and stunning city views. Perfect for travelers seeking comfort and convenience.",
  address: "Jl. Sudirman No. 123, RT.1/RW.2",
  city: "Jakarta",
  country: "Indonesia",
  postal_code: "10220",
  latitude: -6.2087634,
  longitude: 106.845599,
  place_id: "ChIJnUvjRenzaS4RILB9CikUYU",
  map_url:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1764461057637!2d106.67272907475082!3d-6.240461493747818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fbf72fac4ae5%3A0x5574e2db8395e4f7!2sTransmart%20Graha%20Raya!5e0!3m2!1sid!2sid!4v1760257663728!5m2!1sid!2sid",
  amenities: {
    wifi: true,
    parking: true,
    pool: false,
    gym: true,
    air_conditioning: true,
    kitchen: true,
    laundry: false,
    pet_friendly: false,
    others: ["24-hour front desk", "24-hour security", "24-hour concierge"],
  },
  rules: {
    no_smoking: true,
    no_pets: true,
    check_in_after: "14:00",
    check_out_before: "11:00",
    others: ["No parties or events", "No smoking in the common areas"],
  },
  rating_avg: 4.5,
  rating_count: 25,
  base_price: 150000.0, // in IDR
  status: "active" as const,
  created_at: "2023-06-15T10:00:00Z",
  updated_at: "2023-10-01T08:00:00Z",
  tenant: {
    id: 1,
    display_name: "John Smith",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  images: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      is_main: true,
      order_index: 0,
      created_at: "2023-06-15T10:00:00Z",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      is_main: false,
      order_index: 1,
      created_at: "2023-06-15T10:00:00Z",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      is_main: false,
      order_index: 2,
      created_at: "2023-06-15T10:00:00Z",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=765",
      is_main: false,
      order_index: 2,
      created_at: "2023-06-15T10:00:00Z",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1175",
      is_main: false,
      order_index: 2,
      created_at: "2023-06-15T10:00:00Z",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
      is_main: false,
      order_index: 2,
      created_at: "2023-06-15T10:00:00Z",
    },
  ],
  rooms: [
    {
      id: 1,
      uid: "room-001",
      property_id: 1,
      name: "Deluxe Master Bedroom",
      description:
        "Spacious master bedroom with king-size bed, en-suite bathroom, and panoramic city views.",
      base_price: 150000.0,
      max_guest: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      highlight: {
        city_view: true,
        en_suite: true,
        king_bed: true,
      },
      total_units: 1,
      created_at: "2023-06-15T10:00:00Z",
      images: [
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
          is_main: true,
          order_index: 0,
          created_at: "2023-06-15T10:00:00Z",
        },
        {
          id: 2,
          url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
          is_main: false,
          order_index: 1,
          created_at: "2023-06-15T10:00:00Z",
        },
      ],
    },
    {
      id: 2,
      uid: "room-002",
      property_id: 1,
      name: "Comfort Guest Room",
      description:
        "Cozy guest room with queen-size bed, perfect for additional guests or families.",
      base_price: 120000.0,
      max_guest: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      highlight: {
        garden_view: true,
        queen_bed: true,
        others: ["Private balcony", "En-suite bathroom", "City view"],
      },
      total_units: 1,
      created_at: "2023-06-15T10:00:00Z",
      images: [
        {
          id: 1,
          url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
          is_main: true,
          order_index: 0,
          created_at: "2023-06-15T10:00:00Z",
        },
        {
          id: 2,
          url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
          is_main: false,
          order_index: 1,
          created_at: "2023-06-15T10:00:00Z",
        },
      ],
    },
  ],
  peak_season_rates: [
    {
      id: 1,
      property_id: 1,
      room_id: null,
      start_date: "2023-12-20",
      end_date: "2024-01-05",
      adjustment_type: "percentage" as const,
      adjustment_value: 25.0,
      created_at: "2023-06-15T10:00:00Z",
    },
    {
      id: 2,
      property_id: 1,
      room_id: 1,
      start_date: "2023-12-20",
      end_date: "2024-01-05",
      adjustment_type: "nominal" as const,
      adjustment_value: 25000.0,
      created_at: "2023-06-15T10:00:00Z",
    },
  ],
  room_unavailabilities: [
    {
      id: 1,
      property_id: 1,
      room_id: 1,
      booking_id: null,
      start_date: "2023-11-15",
      end_date: "2023-11-18",
      reason: "Maintenance work",
      created_at: "2023-10-01T08:00:00Z",
    },
    {
      id: 2,
      property_id: 1,
      room_id: 2,
      booking_id: null,
      start_date: "2023-12-01",
      end_date: "2023-12-03",
      reason: "Cleaning",
      created_at: "2023-10-01T08:00:00Z",
    },
  ],
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Simulate fetching by ID - for demo purposes, return dummy data for any valid ID
  // In a real app, this would query the database
  if (!id || isNaN(Number(id))) {
    return new Response(JSON.stringify({ error: "Invalid property ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // For demo, return the same property for ID 1, or 404 for others
  if (id === "1") {
    return new Response(JSON.stringify(dummyProperty), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ error: "Property not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });
}
