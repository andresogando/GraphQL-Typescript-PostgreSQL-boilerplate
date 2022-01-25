import * as yup from "yup";

export const userSchema = yup.object({
  email: yup.string().min(3).max(255).email(),
  password: yup.string().min(3).max(255),
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
