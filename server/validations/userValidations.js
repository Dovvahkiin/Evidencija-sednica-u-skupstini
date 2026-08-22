const loginValidation = async (data = []) => {
  const { email, password } = data;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = [];

  if (!email || email.trim() === "") errors.push("Email cannot be empty!\n");

  if (emailRegex.test(email)) errors.push("Invalid email address!\n");

  if (!password || password.trim() === "" || password.length < 8)
    errors.push("Password must be at least 8 characters long!\n");

  return errors;
};

export default loginValidation;
