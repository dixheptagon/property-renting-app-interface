# Get Property Details API

## Overview

This is a mock API endpoint for fetching property details in the property renting application. It simulates a real database query by returning comprehensive dummy data that follows the Prisma schema structure.

## Endpoint

`GET /api/properties/[id]`

## Description

Retrieves detailed information about a specific property by its ID. This endpoint returns property basic info, related images, rooms with their images, tenant information, reviews summary, and optional peak season rates and room unavailabilities.

## Parameters

- `id` (string, required): The unique identifier of the property (currently supports ID "1" for demo purposes)

## Request Example

```
GET /api/properties/1
```

## Response

### Success Response (200 OK)

Returns a JSON object containing all property details:

```json
{
  "id": 1,
  "uid": "prop-001",
  "user_id": 1,
  "category": "apartment",
  "title": "Cozy Modern Apartment in Jakarta",
  "description": "A beautifully designed apartment located in the heart of Jakarta, featuring modern amenities and stunning city views. Perfect for travelers seeking comfort and convenience.",
  "address": "Jl. Sudirman No. 123, RT.1/RW.2",
  "city": "Jakarta",
  "country": "Indonesia",
  "postal_code": "10220",
  "latitude": -6.2087634,
  "longitude": 106.845599,
  "place_id": "ChIJnUvjRenzaS4RILB9CikUYU",
  "map_url": "https://www.google.com/maps/place/Jl.+Sudirman,+Jakarta/@-6.2087634,106.845599,17z",
  "amenities": {
    "wifi": true,
    "parking": true,
    "pool": false,
    "gym": true,
    "air_conditioning": true,
    "kitchen": true,
    "laundry": false,
    "pet_friendly": false
  },
  "rules": {
    "no_smoking": true,
    "no_pets": true,
    "check_in_after": "14:00",
    "check_out_before": "11:00"
  },
  "rating_avg": 4.5,
  "rating_count": 25,
  "base_price": 150000.0,
  "status": "active",
  "created_at": "2023-06-15T10:00:00Z",
  "updated_at": "2023-10-01T08:00:00Z",
  "tenant": {
    "id": 1,
    "display_name": "Ahmad Rahman",
    "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  "images": [
    {
      "id": 1,
      "url": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "is_main": true,
      "order_index": 0,
      "created_at": "2023-06-15T10:00:00Z"
    },
    {
      "id": 2,
      "url": "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      "is_main": false,
      "order_index": 1,
      "created_at": "2023-06-15T10:00:00Z"
    },
    {
      "id": 3,
      "url": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "is_main": false,
      "order_index": 2,
      "created_at": "2023-06-15T10:00:00Z"
    }
  ],
  "rooms": [
    {
      "id": 1,
      "uid": "room-001",
      "property_id": 1,
      "name": "Deluxe Master Bedroom",
      "description": "Spacious master bedroom with king-size bed, en-suite bathroom, and panoramic city views.",
      "base_price": 150000.0,
      "max_guest": 2,
      "bedrooms": 1,
      "bathrooms": 1,
      "beds": 1,
      "highlight": {
        "city_view": true,
        "en_suite": true,
        "king_bed": true
      },
      "total_units": 1,
      "created_at": "2023-06-15T10:00:00Z",
      "images": [
        {
          "id": 1,
          "url": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
          "is_main": true,
          "order_index": 0,
          "created_at": "2023-06-15T10:00:00Z"
        },
        {
          "id": 2,
          "url": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
          "is_main": false,
          "order_index": 1,
          "created_at": "2023-06-15T10:00:00Z"
        }
      ]
    },
    {
      "id": 2,
      "uid": "room-002",
      "property_id": 1,
      "name": "Comfort Guest Room",
      "description": "Cozy guest room with queen-size bed, perfect for additional guests or families.",
      "base_price": 120000.0,
      "max_guest": 2,
      "bedrooms": 1,
      "bathrooms": 1,
      "beds": 1,
      "highlight": {
        "garden_view": true,
        "queen_bed": true
      },
      "total_units": 1,
      "created_at": "2023-06-15T10:00:00Z",
      "images": [
        {
          "id": 3,
          "url": "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
          "is_main": true,
          "order_index": 0,
          "created_at": "2023-06-15T10:00:00Z"
        }
      ]
    }
  ],
  "peak_season_rates": [
    {
      "id": 1,
      "property_id": 1,
      "room_id": null,
      "start_date": "2023-12-20",
      "end_date": "2024-01-05",
      "adjustment_type": "percentage",
      "adjustment_value": 25.0,
      "created_at": "2023-06-15T10:00:00Z"
    },
    {
      "id": 2,
      "property_id": 1,
      "room_id": 1,
      "start_date": "2023-12-20",
      "end_date": "2024-01-05",
      "adjustment_type": "nominal",
      "adjustment_value": 25000.0,
      "created_at": "2023-06-15T10:00:00Z"
    }
  ],
  "room_unavailabilities": [
    {
      "id": 1,
      "property_id": 1,
      "room_id": 1,
      "booking_id": null,
      "start_date": "2023-11-15",
      "end_date": "2023-11-18",
      "reason": "Maintenance work",
      "created_at": "2023-10-01T08:00:00Z"
    },
    {
      "id": 2,
      "property_id": 1,
      "room_id": 2,
      "booking_id": null,
      "start_date": "2023-12-01",
      "end_date": "2023-12-03",
      "reason": "Cleaning",
      "created_at": "2023-10-01T08:00:00Z"
    }
  ]
}
```

### Error Responses

- **400 Bad Request**: When the property ID is invalid or not a number

  ```json
  {
    "error": "Invalid property ID"
  }
  ```

- **404 Not Found**: When the property is not found
  ```json
  {
    "error": "Property not found"
  }
  ```

## Data Structure Details

### Property Fields

- `id`: Unique identifier (number)
- `uid`: Unique string identifier
- `category`: Property type (apartment, house, hotel, villa, room)
- `title`: Property title
- `description`: Detailed description
- `address`, `city`, `country`, `postal_code`: Location details
- `latitude`, `longitude`: GPS coordinates
- `place_id`, `map_url`: Google Maps integration
- `amenities`: JSON object of available amenities
- `rules`: JSON object of property rules
- `rating_avg`: Average rating (decimal)
- `rating_count`: Number of reviews
- `base_price`: Base price per night (decimal)
- `status`: Property status (active, draft, deleted)

### Tenant Information

- `id`: Tenant user ID
- `display_name`: Display name
- `image`: Profile image URL

### Images

Array of property images with:

- `id`: Image ID
- `url`: Image URL
- `is_main`: Whether it's the main image
- `order_index`: Display order

### Rooms

Array of rooms with full details including:

- Basic room info (id, uid, name, description)
- Pricing and capacity (base_price, max_guest, bedrooms, bathrooms, beds)
- `highlight`: JSON object of room highlights
- `total_units`: Number of units available
- `images`: Array of room images

### Peak Season Rates

Array of seasonal pricing adjustments:

- `start_date`, `end_date`: Date range
- `adjustment_type`: "percentage" or "nominal"
- `adjustment_value`: Adjustment amount

### Room Unavailabilities

Array of unavailable periods:

- `start_date`, `end_date`: Unavailable date range
- `reason`: Reason for unavailability

## Notes

- This is a mock implementation for development and testing purposes
- Currently returns dummy data only for property ID "1"
- All data conforms to the Prisma schema defined in `public/data/schema.md`
- Image URLs use Unsplash for realistic placeholders
- Prices are in Indonesian Rupiah (IDR)
- Dates are in ISO 8601 format

## Usage in Frontend

```typescript
// Example fetch call
const fetchPropertyDetails = async (propertyId: string) => {
  try {
    const response = await fetch(`/api/properties/${propertyId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch property details");
    }
    const propertyData = await response.json();
    return propertyData;
  } catch (error) {
    console.error("Error fetching property:", error);
  }
};
```

## Integration with Property Details Page

This API endpoint is designed to be used by the Property Details page components to display comprehensive property information, including:

- Property summary and description
- Image gallery
- Room types and availability
- Location and map
- Amenities and rules
- Tenant/host information
- Reviews summary
- Pricing information including seasonal rates
