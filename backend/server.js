import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import DHTData from './models/DHTData.js'

const app = express()

app.use(cors())
app.use(express.json())

connectDB();

app.post("/dht", async (req, res) => {
  const { temperatura, humedad } = req.body

  try {
    const doc = await DHTData.create({
      temperatura,
      humedad,
    })

    res.json({ ok: true, data: doc })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error guardando en DB" })
  }
});

// GET /dht/ultimo → retorna el último valor guardado
app.get("/dht/ultimo", async (req, res) => {
  try {
    const dato = await DHTData.findOne().sort({ timestamp: -1 })

    if (!dato) return res.json({ error: "Sin datos aún" })

    res.json(dato)
  } catch (error) {
    res.status(500).json({ error: "Error leyendo DB" })
  }
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})