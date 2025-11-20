import * as Yup from "yup";

export const PropertyValidationSchema = Yup.object().shape({
  category: Yup.string().required("Please select a category"),

  title: Yup.string()
    .required("Please enter a title")
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must not exceed 50 characters"),
  description: Yup.string()
    .required("Please enter a description")
    .min(3, "Description must be at least 3 characters")
    .max(1500, "Description must not exceed 1500 characters"),

  address: Yup.string()
    .required("Please enter an address")
    .min(3, "Address must be at least 3 characters")
    .max(250, "Your address too long,Address must not exceed 250 characters"),
  city: Yup.string()
    .required("Please enter a city")
    .min(3, "City must be at least 3 characters")
    .max(50, "City must not exceed 50 characters"),
  country: Yup.string()
    .required("Please enter a country")
    .min(3, "Country must be at least 3 characters"),
  postal_code: Yup.number().required("Please enter a postal code"),
  map_url: Yup.string().required("Please enter a map spot"),

  amenities: Yup.array().required("Please select at least one amenity").min(1),
  custom_amenities: Yup.array()
    .of(
      Yup.string().max(50, "Each custom amenity must not exceed 50 characters")
    )
    .optional(),
  rules: Yup.array().required("Please select at least one rule").min(1),
  custom_rules: Yup.array()
    .of(Yup.string().max(50, "Each custom rule must not exceed 50 characters"))
    .optional(),

  images: Yup.array()
    .required("Please upload at least 5 images")
    .min(5, "You must upload at least 5 images")
    .max(10, "You can upload a maximum of 10 images"),
});
