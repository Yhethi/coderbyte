import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";

const Question1 = () => {
  const [formData, setFormData] = useState({
    days: 0,
    daily_rate: 0,
    discount: 0,
    tax_rate: 0,
  });

  const [jsonDataInputs, setJsonDataInputs] = useState({});
  const [jsonDataCalc, setJsonDataCalc] = useState({});
  const [jsonSend, setJsonSend] = useState({
    days: 5,
    daily_rate: 120,
    discount: 20,
    tax_rate: 0.08,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSend = (e) => {
    e.preventDefault();
    const subtotal = formData.days * formData.daily_rate;
    const discount_applied = formData.discount;
    const tax_amount = (subtotal - formData.discount) * formData.tax_rate;
    const total_price = subtotal - discount_applied + tax_amount;

    setJsonDataInputs({
      subtotal,
      discount_applied,
      tax_amount,
      total_price,
    });
  };

  const getJsonData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/calculate-rental-price",
        jsonSend
      );
      setJsonDataCalc(response.data);
    } catch (error) {
      console.error("Data Error", error);
    }
  };
 
  return (
    <>
      <Header />
      <div className="app_global">
        <form>
          <h1>Question 1 from json</h1>
          <h3>Data send:</h3>
          <p>{JSON.stringify(jsonSend)}</p>
          <h3>Data Get:</h3>
          <p>{JSON.stringify(jsonDataCalc)}</p>
          <button type="button" onClick={getJsonData}>
            Get Data
          </button>
        </form>
        <form onSubmit={handleSend}>
          <h1>Question 1 with inputs</h1>

          <input
            type="number"
            value={formData.days}
            onChange={(e) => {
              let value = e.target.value;
              value = value.replace(/\D/g, "");
              e.target.value = value ? parseInt(value, 10) : "";

              handleChange(e);
            }}
            name="days"
            placeholder="Days"
            onKeyDown={(e) => {
              return e.charCode >= 48;
            }}
          />
          <input
            type="number"
            value={formData.daily_rate}
            onChange={(e) => {
              if (e.target.value < 0) {
                e.target.value = 0;
                handleChange(e);
              } else {
                handleChange(e);
              }
            }}
            name="daily_rate"
            placeholder="Daily Rate"
            step="0.01"
            onKeyDown={(e) => {
              if (["e", "E", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />

          <input
            type="number"
            value={formData.discount}
            onChange={(e) => {
              if (e.target.value < 0) {
                e.target.value = 0;
                handleChange(e);
              } else {
                handleChange(e);
              }
            }}
            name="discount"
            placeholder="Discount"
            step="0.01"
            onKeyDown={(e) => {
              if (["e", "E", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
          <input
            type="number"
            value={formData.tax_rate}
            onChange={(e) => {
              if (e.target.value < 0) {
                e.target.value = 0;
                handleChange(e);
              } else {
                handleChange(e);
              }
            }}
            name="tax_rate"
            placeholder="Tax Rate"
            step="0.01"
            onKeyDown={(e) => {
              if (["e", "E", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
          <button type="submit">Sen and get Data</button>
          <h3>Data get:</h3>
          <p>{JSON.stringify(formData)}</p>
          <br></br>
          <h3>Data transform:</h3>
          <p>{JSON.stringify(jsonDataInputs)}</p>
        </form>
      </div>
    </>
  );
};

export default Question1;
