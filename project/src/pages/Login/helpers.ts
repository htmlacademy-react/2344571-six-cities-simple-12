export const isPasswordValidate = (password: string): boolean => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/g;
  return regex.test(password);
};
