import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/calcular-precio-de-alquiler", (req, res) => {
  const { days, daily_rate, discount, tax_rate } = req.body;

  if (
    !days ||
    !daily_rate ||
    discount === undefined ||
    tax_rate === undefined
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const subtotal = days * daily_rate;
  const discount_applied = discount;
  const tax_amount = (subtotal - discount_applied) * tax_rate;
  const total_price = subtotal - discount_applied + tax_amount;

  res.json({
    subtotal,
    discount_applied,
    tax_amount,
    total_price,
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
