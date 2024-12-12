const { check } = require("express-validator");

const userRegisterValidation = [
  check("username")
    .notEmpty()
    .withMessage("Username harus diisi")
    .isLength({ min: 5, max: 10 })
    .withMessage("Username harus antara 5 hingga 10 karakter"),
  check("email")
    .notEmpty()
    .withMessage("Email harus diisi")
    .isEmail()
    .withMessage("Email harus valid")
    .custom((value) => {
      if (!value.endsWith("@gmail.com")) {
        throw new Error("Email harus berakhiran @gmail.com");
      }
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("Password harus diisi")
    .isLength({ min: 5, max: 10 })
    .withMessage("Password harus antara 5 hingga 10 karakter")
    .matches(/[A-Z]/)
    .withMessage("Password harus mengandung huruf besar"),
  check("confirmPassword")
    .notEmpty()
    .withMessage("Confirm password harus diisi")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password dan confirm password harus sama");
      }
      return true;
    }),
];

module.exports = userRegisterValidation;
