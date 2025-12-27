import { body } from "express-validator";
import { EChatSchema } from "~/schemas/chat.schema.ts";

export const chatValidatorMiddleware = [
  body(EChatSchema.message)
    .notEmpty()
    .withMessage("message field should not be empty!")
    .isString()
    .withMessage("message field must be string!")
    .escape(),
];
