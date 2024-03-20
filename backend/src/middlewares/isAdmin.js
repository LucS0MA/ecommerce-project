const isAdmin = (req, res, next) => {
  const { seelie } = req.auth;

  if (seelie === 1) {
    next();
  } else {
    res.status(401).json({ message: "Vous n'êtes pas une Seelie." });
  }
};

module.exports = isAdmin;
