import { invalidEmail, passwordNotLongEnough } from "@resolvers/errors";
import * as yup from "yup";

export const userSchema = yup.object({
  email: yup
    .string()
    .min(3, "email must be at least 3 characters")
    .max(255)
    .email(invalidEmail),
  password: yup.string().min(3, passwordNotLongEnough).max(255),
});

export const formatYupError = (err: yup.ValidationError) => {
  const errors: Array<{ path: string | undefined; message: string }> = [];
  err?.inner.forEach((e) => {
    errors.push({
      path: e.path,
      message: e.message,
    });
  });

  return errors;
};
