const jwt = require("jsonwebtoken");
const User = require("../models/User");
const supabase = require("../supabase/supabaseClient");

module.exports = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const {
      data: { user },
      error,
    } = await supabase.auth.api.getUser(token);

    if (error) throw new Error(error.message);

    const dbUser = await User.findOne({ supabaseId: user.id });

    if (!dbUser) return res.sendStatus(401);

    req.user = dbUser;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};
