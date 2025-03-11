import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/calculate-rental-price", (req, res) => {
  const { days, daily_rate, discount, tax_rate } = req.body;

  if (
    !days ||
    !daily_rate ||
    discount === undefined ||
    tax_rate === undefined
  ) {
    return res.status(400).json({ error: "All inputs is required" });
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

app.post("/extend-rental", (req, res) => {
  const { original_end_time, new_end_time, daily_rate } = req.body;

  if (!original_end_time || !new_end_time || daily_rate === undefined) {
    return res.status(400).json({ error: "All inputs is required" });
  }

  const newTime = new Date(original_end_time);
  const newEndTime = new Date(new_end_time);
  const differenceMs = newEndTime - newTime;
  const differenceHours = differenceMs / (1000 * 60 * 60);

  const extension_hours = differenceHours;
  const hourly_rate = daily_rate / 24;
  const extension_fee = hourly_rate * extension_hours;

  res.json({
    extension_hours,
    hourly_rate,
    extension_fee,
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
