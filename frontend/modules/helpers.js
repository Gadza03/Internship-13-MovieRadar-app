export function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

export function validateName(name) {
  return name.length >= 2;
}

export function validatePassword(password) {
  return password.length >= 5 && /\d/.test(password);
}
