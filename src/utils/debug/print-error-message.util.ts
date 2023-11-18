import { getErrorMessage } from "../error/error-message.util";

export function printErrorMessage(
  error: unknown,
  functionName = "Some Function"
) {
  console.error(`⚠️ ERROR :: ${functionName} :: ${getErrorMessage(error)}`);
}
