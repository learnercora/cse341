const emilyRoute = (req, res) => {
  res.send("Emily");
};

const hannahRoute = (req, res) => {
  res.send("Hannah");
};

module.exports = {
  emilyRoute,
  hannahRoute,
};
