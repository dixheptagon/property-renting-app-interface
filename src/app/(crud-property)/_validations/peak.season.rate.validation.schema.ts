import * as Yup from "yup";

export const PeakSeasonRateValidationSchema = Yup.object().shape({
  selectedRoom: Yup.string().required("Please select a room"),
});
