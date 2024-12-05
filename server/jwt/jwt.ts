const jwt = require("jsonwebtoken");

const JWT_SECRET = "OnceUponATimeInHollywoodElGatoComeEverythingHeFind";

exports.generateToken = async (userData) => {
  return jwt.sign(
    {
      _id: userData._id,
      email: userData.email,
      role: userData.role,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};
