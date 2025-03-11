import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";

const Question2 = () => {
  const [formData, setFormData] = useState({
    original_end_time: "",
    new_end_time: "",
    daily_rate: "",
  });

  const [jsonDataInputs, setJsonDataInputs] = useState({});
  const [jsonDataCalc, setJsonDataCalc] = useState({});
  const [jsonSend, setJsonSend] = useState({
    original_end_time: "2025-03-12T12:00:00",
    new_end_time: "2025-03-12T18:00:00",
    daily_rate: 120,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSend = (e) => {
    e.preventDefault();
    const originalEndTime = new Date(formData.original_end_time);
    const newEndTime = new Date(formData.new_end_time);
    const differenceMs = newEndTime - originalEndTime;
    const differenceHours = differenceMs / (1000 * 60 * 60);

    const extension_hours = differenceHours;
    const hourly_rate = formData.daily_rate / 24;
    const extension_fee = hourly_rate * extension_hours;
    setJsonDataInputs({
      extension_hours,
      hourly_rate,
      extension_fee,
    });
  };

  const getJsonData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/extend-rental",
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
          <h1>Question 2 from json</h1>
          <h3>Data send:</h3>
          <p>{JSON.stringify(jsonSend)}</p>
          <h3>Data Get:</h3>
          <p>{JSON.stringify(jsonDataCalc)}</p>
          <button type="button" onClick={getJsonData}>
            Get Data
          </button>
        </form>
        <form onSubmit={handleSend}>
          <div>
            <label>
              Original End Time:
              <input
                type="datetime-local"
                name="original_end_time"
                value={formData.original_end_time}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              New End Time:
              <input
                type="datetime-local"
                name="new_end_time"
                value={formData.new_end_time}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Daily Rate:
              <input
                type="number"
                name="daily_rate"
                value={formData.daily_rate}
                onChange={handleChange}
                required
              />
            </label>
          </div>
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

export default Question2;
