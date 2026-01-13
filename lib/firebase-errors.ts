type FirebaseError = {
  code?: string;
  message?: string;
};

/**
 * Maps Firebase error codes to user-friendly error messages
 */
const FIREBASE_ERROR_MESSAGES: Record<string, string> = {
  // Authentication errors
  "auth/invalid-credential": "Invalid email or password",
  "auth/user-not-found": "No account found with this email",
  "auth/wrong-password": "Incorrect password",
  "auth/email-already-in-use": "An account with this email already exists",
  "auth/weak-password": "Password is too weak. Please use a stronger password",
  "auth/invalid-email": "Invalid email address",
  "auth/user-disabled": "This account has been disabled",
  "auth/too-many-requests": "Too many failed attempts. Please try again later",
  "auth/operation-not-allowed": "This operation is not allowed",
  "auth/requires-recent-login": "Please sign in again to complete this action",
  "auth/network-request-failed": "Network error. Please check your connection",
  "auth/popup-closed-by-user": "Sign-in popup was closed",
  "auth/cancelled-popup-request": "Only one popup request is allowed at a time",
  "auth/popup-blocked": "Popup was blocked by browser",
  "auth/account-exists-with-different-credential":
    "An account already exists with the same email but different sign-in method",
  "auth/credential-already-in-use":
    "This credential is already associated with a different account",
  "auth/invalid-action-code": "Invalid or expired action code",
  "auth/expired-action-code": "The action code has expired",
  "auth/invalid-verification-code": "Invalid verification code",
  "auth/invalid-verification-id": "Invalid verification ID",
  "auth/missing-verification-code": "Verification code is required",
  "auth/missing-verification-id": "Verification ID is required",
  "auth/quota-exceeded": "Quota exceeded. Please try again later",
  "auth/unauthorized-domain": "This domain is not authorized",
  "auth/app-deleted": "This app has been deleted",
  "auth/invalid-api-key": "Invalid API key",
  "auth/invalid-user-token": "User session has expired. Please sign in again",
  "auth/user-token-expired": "User session has expired. Please sign in again",
};

/**
 * Gets a user-friendly error message from a Firebase error
 * @param error - The Firebase error object
 * @param defaultMessage - Default message to return if error code is not recognized
 * @returns User-friendly error message
 */
export const getFirebaseErrorMessage = (
  error: FirebaseError | Error | unknown,
  defaultMessage = "An error occurred. Please try again"
): string => {
  // Handle Firebase error with code property
  if (error && typeof error === "object" && "code" in error) {
    const firebaseError = error as FirebaseError;
    if (firebaseError.code && FIREBASE_ERROR_MESSAGES[firebaseError.code]) {
      return FIREBASE_ERROR_MESSAGES[firebaseError.code];
    }
  }

  // Handle standard Error object
  if (error instanceof Error) {
    // Check if it's a Firebase error by checking the error message
    const errorMessage = error.message;
    for (const [code, message] of Object.entries(FIREBASE_ERROR_MESSAGES)) {
      if (errorMessage.includes(code)) {
        return message;
      }
    }
    // Return the error message if it exists
    if (errorMessage) {
      return errorMessage;
    }
  }

  // Fallback to default message
  return defaultMessage;
};

/**
 * Checks if an error is a Firebase error
 * @param error - The error to check
 * @returns True if the error is a Firebase error
 */
export const isFirebaseError = (
  error: unknown
): error is FirebaseError & { code: string } => {
  return !!(
    error !== null &&
    typeof error === "object" &&
    "code" in error &&
    typeof (error as FirebaseError).code === "string" &&
    (error as FirebaseError).code?.startsWith("auth/")
  );
};
