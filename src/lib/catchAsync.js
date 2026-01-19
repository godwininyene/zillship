import { sendError } from "./apiError";

export const catchAsync = (fn, req={}) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (err) {
      // console.error("API ERROR:", err);
      return sendError(err);
    }
  };
};
