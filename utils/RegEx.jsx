export default {
  namePattern: /^[0-9\b]+$/,
  emailPattern:
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  numberPattern: /^[0]?[6789]\d{9}$/,
  passwordPattern:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  panPattern: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
  gstPattern: /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/,
  bankAccountNumberPattern: /^[0-9]{9,18}$/,
  ifscPattern: /^[A-Za-z]{4}[a-zA-Z0-9]{7}$/,
  whitespace: /\s/g,
};
import * as Yup from "yup";
export const transporterSchema = Yup.object({
  transporterName: Yup.string()
    .min(2)
    .max(25)
    .required("Please enter your name"),
  transporterPinCode: Yup.number().required("Please enter your Pin Code"),
});
