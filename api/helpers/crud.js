import { Router } from "express"
import getOne from "./getOne.js"

const CRUD = (model, primaryKey = "_id") => {
  const router = Router()

  // List
  router.get("/", async (req, res) => {
    try {
      const instances = await model.find()
      return res.status(200).json(instances)
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  })

  // Create
  router.post("/", async (req, res) => {
    try {
      const instance = new model(req.body)
      await instance.save()
      return res.status(201).json(instance)
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  })

  // Retrieve
  router.get(`/:${primaryKey}`, getOne(model), async (req, res) => {
      return res.status(200).json(res.instance)
  })

  // Update
  router.patch(`/:${primaryKey}`, getOne(model), async (req, res) => {
    try {
      res.instance.set(req.body)
      await res.instance.save()
      return res.status(202).json(res.instance)
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  })

  // Delete
  router.delete(`/:${primaryKey}`, getOne(model), async (req, res) => {
    try {
      await res.instance.remove()
      return res.status(200).json(res.instance)
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  })

  return router
}

export default CRUD