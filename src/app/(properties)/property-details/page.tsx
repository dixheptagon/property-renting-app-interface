import React from 'react';
import PropertyImageGrid from './_components/property.image.grid';
import PropertyProfile from './_components/property.profile';
import PropertyAmenities from './_components/property.amenities';
import PropertyRules from './_components/property.rules';
import PropertyRoomTypes from './_components/property.room.types';
import PropertyLocation from './_components/property.location';
import PropertyReviews from './_components/property.reviews';
import PropertySummary from './_components/property.summary';

export default function PropertyDetails() {
  return (
    <div className="mx-auto my-10">
      <PropertyImageGrid />

      <PropertyProfile />
      <PropertyAmenities />
      <PropertyRules />
      <PropertyRoomTypes />

      <PropertySummary />

      <PropertyLocation />
      <PropertyReviews />
    </div>
  );
}
