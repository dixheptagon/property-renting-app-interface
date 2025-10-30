import * as Yup from "yup";

export const RoomValidationSchema = Yup.object().shape({
  tempId: Yup.string().required("Room ID is required"),

  name: Yup.string().required("Room name is required"),
  description: Yup.string().required("Room description is required"),

  base_price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(25000, "Minimum price is Rp 25.000")
    .max(100000000, "Maximum price is Rp 100.000.0000"),

  max_guest: Yup.number().required("Room max guest is required"),
  total_units: Yup.number().required("Room total units is required"),
  bedrooms: Yup.number().required("Room bedrooms is required"),
  bathrooms: Yup.number().required("Room bathrooms is required"),
  beds: Yup.number().required("Room beds is required"),

  highlight: Yup.array().required("Please select at least one amenity").min(1),
  custom_highlight: Yup.array()
    .of(Yup.string().max(50, "Each custom rule must not exceed 50 characters"))
    .optional(),

  images: Yup.array().required("Room images are required"),
});
