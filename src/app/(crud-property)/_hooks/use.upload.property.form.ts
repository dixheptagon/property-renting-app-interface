import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import type { UploadPropertyData } from "../_types/upload.property.type";

export function useUploadPropertyForm({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) {
  return useMutation({
    mutationKey: ["upload-property-form"],
    mutationFn: async (data: UploadPropertyData) => {
      const formData = new FormData();

      // Add property data
      formData.append("title", data.property.title);
      formData.append("category", data.property.category || "");
      formData.append("description", data.property.description);
      formData.append("base_price", data.property.base_price.toString());
      formData.append("address", data.property.address);
      formData.append("city", data.property.city);
      formData.append("country", data.property.country);
      formData.append("postal_code", data.property.postal_code);
      if (data.property.latitude)
        formData.append("latitude", data.property.latitude.toString());
      if (data.property.longitude)
        formData.append("longitude", data.property.longitude.toString());
      if (data.property.place_id)
        formData.append("place_id", data.property.place_id);
      if (data.property.map_url)
        formData.append("map_url", data.property.map_url);

      // Add amenities
      formData.append("amenities", JSON.stringify(data.property.amenities));
      formData.append(
        "custom_amenities",
        JSON.stringify(data.property.custom_amenities)
      );

      // Add rules
      formData.append("rules", JSON.stringify(data.property.rules));
      formData.append(
        "custom_rules",
        JSON.stringify(data.property.custom_rules)
      );

      // Add property images
      data.propertyImages.forEach((image, index) => {
        formData.append(`property_images[${index}][id]`, image.id.toString());
        formData.append(`property_images[${index}][publicId]`, image.publicId);
        formData.append(
          `property_images[${index}][secureUrl]`,
          image.secureUrl
        );
        formData.append(
          `property_images[${index}][isMain]`,
          image.isMain.toString()
        );
        formData.append(
          `property_images[${index}][orderIndex]`,
          image.orderIndex.toString()
        );
        formData.append(`property_images[${index}][status]`, image.status);
        formData.append(
          `property_images[${index}][tempGroupId]`,
          image.tempGroupId
        );
      });

      // Add rooms
      data.rooms.forEach((room, roomIndex) => {
        formData.append(`rooms[${roomIndex}][tempId]`, room.tempId);
        formData.append(`rooms[${roomIndex}][name]`, room.name);
        formData.append(`rooms[${roomIndex}][description]`, room.description);
        formData.append(
          `rooms[${roomIndex}][base_price]`,
          room.base_price.toString()
        );
        formData.append(
          `rooms[${roomIndex}][max_guest]`,
          room.max_guest.toString()
        );
        formData.append(
          `rooms[${roomIndex}][total_units]`,
          room.total_units.toString()
        );
        formData.append(
          `rooms[${roomIndex}][bedrooms]`,
          room.bedrooms.toString()
        );
        formData.append(
          `rooms[${roomIndex}][bathrooms]`,
          room.bathrooms.toString()
        );
        formData.append(`rooms[${roomIndex}][beds]`, room.beds.toString());
        formData.append(
          `rooms[${roomIndex}][highlight]`,
          JSON.stringify(room.highlight)
        );
        formData.append(
          `rooms[${roomIndex}][custom_highlight]`,
          JSON.stringify(room.custom_highlight)
        );

        // Add room images
        room.images.forEach((image: any, imageIndex: number) => {
          formData.append(
            `rooms[${roomIndex}][images][${imageIndex}][id]`,
            image.id.toString()
          );
          formData.append(
            `rooms[${roomIndex}][images][${imageIndex}][publicId]`,
            image.publicId
          );
          formData.append(
            `rooms[${roomIndex}][images][${imageIndex}][secureUrl]`,
            image.secureUrl
          );
          formData.append(
            `rooms[${roomIndex}][images][${imageIndex}][isMain]`,
            image.isMain.toString()
          );
          formData.append(
            `rooms[${roomIndex}][images][${imageIndex}][orderIndex]`,
            image.orderIndex.toString()
          );
          formData.append(
            `rooms[${roomIndex}][images][${imageIndex}][status]`,
            image.status
          );
          formData.append(
            `rooms[${roomIndex}][images][${imageIndex}][tempGroupId]`,
            image.tempGroupId
          );
        });
      });

      // Add peak season rates
      data.peakSeasonRates.forEach((rate, index) => {
        formData.append(`peak_season_rates[${index}][tempId]`, rate.tempId);
        formData.append(
          `peak_season_rates[${index}][targetTempRoomId]`,
          rate.targetTempRoomId
        );
        formData.append(
          `peak_season_rates[${index}][start_date]`,
          rate.start_date
        );
        formData.append(`peak_season_rates[${index}][end_date]`, rate.end_date);
        formData.append(
          `peak_season_rates[${index}][adjustment_type]`,
          rate.adjustment_type
        );
        formData.append(
          `peak_season_rates[${index}][adjustment_value]`,
          rate.adjustment_value.toString()
        );
      });

      // Add unavailabilities
      data.unavailabilities.forEach((unavailability, index) => {
        formData.append(
          `unavailabilities[${index}][tempId]`,
          unavailability.tempId
        );
        formData.append(
          `unavailabilities[${index}][targetTempRoomId]`,
          unavailability.targetTempRoomId
        );
        formData.append(
          `unavailabilities[${index}][start_date]`,
          unavailability.start_date
        );
        formData.append(
          `unavailabilities[${index}][end_date]`,
          unavailability.end_date
        );
        formData.append(
          `unavailabilities[${index}][reason]`,
          unavailability.reason
        );
      });

      const res = await axiosInstance.post(
        "/api/properties/upload-property",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 180000, // 180 seconds
        }
      );

      return res.data;
    },
    onSuccess,
    onError,
  });
}
