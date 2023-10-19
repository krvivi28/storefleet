export const getAppProducts = (req, res) => {
  res.status(200).json({ succes: true, msg: "received all products" });
};
