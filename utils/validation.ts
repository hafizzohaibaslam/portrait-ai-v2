export const validateEmail = (email?: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email || "");
};

export const validatePassword = (password: string = "") => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const isAtLeast8Chars = password.length >= 8;
  const valid = hasUpperCase && hasLowerCase && isAtLeast8Chars;

  return {
    valid,
    hasLowerCase,
    hasUpperCase,
    isAtLeast8Chars,
  };
};
