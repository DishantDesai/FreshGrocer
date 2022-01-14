import * as yup from "yup";

export const signUPValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  fullName: yup.string().required("Fullname is Required"),
  phoneNumber: yup
    .string()
    .required("Phone Number is Required")
    .max(12, () => "Please enter valid number"),
  address: yup.string().required("Address is Required"),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});
