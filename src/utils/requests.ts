/**
 * One response format for all requests.
 *
 * @return {object} Formatted response.
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
