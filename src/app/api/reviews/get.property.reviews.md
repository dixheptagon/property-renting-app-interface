# Get Property Reviews API

## Endpoint

`GET /api/reviews/[propertyId]`

## Description

Retrieves dummy reviews for a specific property based on the provided `propertyId`. This endpoint generates 3-10 random reviews each time it is called, simulating real review data for development and testing purposes.

## Parameters

- `propertyId` (path parameter): The ID of the property for which to fetch reviews. Must be a valid integer.

## Response

Returns an array of review objects in JSON format.

### Review Object Structure

Each review object contains the following fields:

- `id`: number - Unique identifier for the review (sequential within the response)
- `propertyId`: number - ID of the property being reviewed (matches the request parameter)
- `user`: object - Information about the reviewer
  - `id`: number - Unique user ID
  - `name`: string - User's full name
  - `avatar`: string - URL to the user's avatar image
- `rating`: number - Rating given by the user (integer from 1 to 5)
- `comment`: string - The review text/comment
- `createdAt`: string - ISO 8601 formatted date string indicating when the review was created

## Example Response

```json
[
  {
    "id": 1,
    "propertyId": 123,
    "user": {
      "id": 1,
      "name": "John Doe",
      "avatar": "https://example.com/avatar1.jpg"
    },
    "rating": 5,
    "comment": "Great place! Highly recommend.",
    "createdAt": "2024-10-01T10:00:00.000Z"
  },
  {
    "id": 2,
    "propertyId": 123,
    "user": {
      "id": 2,
      "name": "Jane Smith",
      "avatar": "https://example.com/avatar2.jpg"
    },
    "rating": 4,
    "comment": "Amazing stay, very clean and comfortable.",
    "createdAt": "2024-09-15T14:30:00.000Z"
  }
]
```

## Error Responses

- `400 Bad Request`: Returned when the `propertyId` parameter is not a valid integer.
  ```json
  {
    "error": "Invalid propertyId"
  }
  ```

## Notes

- This is a dummy endpoint that generates random review data for development purposes.
- The number of reviews returned varies between 3 and 10 for each request.
- Review dates are randomly generated within the past year.
- All data is fictional and for testing only.
