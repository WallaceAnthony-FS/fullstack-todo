
const getOne = (model, primaryKey = "_id") => {
  return async (req, res, next) => {
    let instance
    try{
      instance = await model.findOne({ [primaryKey]: req.params[primaryKey] })
      if(!instance) return res.status(404)
    } catch(err) {
      return res.status(500).json({ message: err.message })
    }
    res.instance = instance
    next()
  }
}

export default getOne