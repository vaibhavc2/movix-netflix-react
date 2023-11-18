import { getErrorMessage } from "../error/error-message.util";

export function printErrorMessage(
  error: unknown,
  functionName = "Some Function"
) {
  console.log(`⚠️ ERROR :: ${functionName} :: ${getErrorMessage(error)}`);
}
