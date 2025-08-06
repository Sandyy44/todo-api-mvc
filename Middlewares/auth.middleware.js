const jwt = require('jsonwebtoken')
const { promisify } = require('util')

exports.auth = async (req, res, next) => {
  let { authorization } = req.headers
  if (!authorization) return res.status(403).json({ message: "forbidden" })
  try {
    let payload = await promisify(jwt.verify)(authorization, process.env.TOKEN_PRIVATE_KEY)
    if (!payload) return res.status(401).json({ message: "unauthorized" })
    req.role = payload.role
    next();
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "failed to authorize" })
  }


}
exports.restricTo = (...roles) => {
  return function (req, res, next) {
    if (!roles.includes(req.role)) return res.status(403).json({ message: "forbidden" })
    next()

  }
}