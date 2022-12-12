/**
 * One response format for all requests.
 *
 */
export const formatResponse = (
  res: object,
  message: string,
  success = true
) => ({
  data: res,
  msg: message,
  success
});
