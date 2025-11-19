import * as Yup from "yup";

export const PeakSeasonRateValidationSchema = Yup.object().shape({
  selectedRoom: Yup.array()
    .of(Yup.string())
    .min(1, "Please select at least one room")
    .required("Please select at least one room"),
  dateRange: Yup.object()
    .shape({
      from: Yup.date().required("Start date is required"),
      to: Yup.date().required("End date is required"),
    })
    .required("Date range is required")
    .test(
      "date-range-valid",
      "End date must be after start date",
      function (value) {
        if (!value?.from || !value?.to) return false;
        return value.to > value.from;
      }
    ),
  peakPricePercentage: Yup.number()
    .min(1, "Percentage must be at least 1%")
    .max(100, "Percentage cannot exceed 100%")
    .required("Peak price percentage is required"),
});
