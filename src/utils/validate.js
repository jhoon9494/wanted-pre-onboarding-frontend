export const validateEmail = (email) => {
  const regEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  return regEmail.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};
