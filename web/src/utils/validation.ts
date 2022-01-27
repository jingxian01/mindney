import { FieldError } from "../generated/graphql";

export const bottomErrorHandler = (message: string): string[] => {
  const removedTagError = removeTag(message);
  return splitMessages(removedTagError);
};

const removeTag = (message: string) => {
  return message.split("] ")[1];
};

const splitMessages = (message: string): string[] => {
  return message.split(",");
};

export const fieldErrorHandler = (
  fieldError: FieldError
): Record<string, string> => {
  const { field, message } = fieldError;
  const errorMap: Record<string, string> = {};
  errorMap[field] = message;
  return errorMap;
};
