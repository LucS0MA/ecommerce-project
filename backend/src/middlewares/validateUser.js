const validateUser = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  if (email == null) {
    errors.push({ field: "email", message: "The field 'email' is required" });
  } else if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Invalid email" });
  }

  if (password == null) {
    errors.push({
      field: "password",
      message: "The field 'password' is required",
    });
  } else if (
    !(
      /.{8}/.test(password) &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[#$@!%*?&]/.test(password)
    )
  ) {
    errors.push({ field: "password", message: "Invalid password" });
  }

  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = validateUser;
