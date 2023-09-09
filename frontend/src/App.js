import './App.css';
import React, { useState } from "react";

function App() {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [responseText, setResponseText] = useState("");
  //const responseData = ""

  const handleOption1Change = (event) => {
    setOption1(event.target.value);
  };

  const handleOption2Change = (event) => {
    setOption2(event.target.value);
  };

  const handleSubmit = async () => {
    const requestBody = {
      zodiac: option1,
      category: option2,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/gethoroscope", {
      
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const responseData = await response.text();
      console.log("Response Text Data:", responseData);
      if (response.ok) {
        // Handle successful response from the backend
        console.log("Request sent successfully");
        setResponseText(responseData);
      } else {
        // Handle error response from the backend
        console.error("Error sending request");
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="App">
      <h1>Horoscope Generator</h1>
      <p>Today's Date: {new Date().toLocaleDateString()}</p>
      <div>
        <label htmlFor="option1">Select Your Zodiac: </label>
        <select id="option1" value={option1} onChange={handleOption1Change}>
          <option value="aries">Aries</option>
          <option value="taurus">Taurus</option>
          <option value="gemini">Gemini</option>
          <option value="cancer">Cancer</option>
          <option value="leo">Leo</option>
          <option value="virgo">Virgo</option>
          <option value="libra">Libra</option>
          <option value="scorpio">Scorpio</option>
          <option value="sagittarius">Sagittarius</option>
          <option value="capricorn">Capricorn</option>
          <option value="aquarius">Aquarius</option>
          <option value="pisces">Pisces</option>
        </select>
      </div>
      <div>
        <label htmlFor="option2">Category: </label>
        <select id="option2" value={option2} onChange={handleOption2Change}>
          <option value="general">General</option>
          <option value="career">Career</option>
          <option value="love">Love</option>
          <option value="friendship">Friendship</option>
          <option value="wellness">Wellness</option>
        </select>
      </div>
      <button onClick={handleSubmit}>Get Your Horoscope</button>
      <div className="response-container">
        <p>{responseText}</p>
      </div> 
    </div>
    
  );
}

export default App;
