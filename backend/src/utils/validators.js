exports.isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

exports.isValidPassword = (password) => {
  return password && password.length >= 5;
};
