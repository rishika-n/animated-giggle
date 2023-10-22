import './Horoscope.css';
import React, { useState } from "react";
import { EmailShareButton, EmailIcon, FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';

function Horoscope() {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [responseText, setResponseText] = useState("");

  const handleOption1Change = (event) => {
    setOption1(event.target.value);
  };

  const handleOption2Change = (event) => {
    setOption2(event.target.value);
  };

  const handleSubmit = async () => {
    const currentDate = new Date();
    const todaydate = String(currentDate.getMonth()+1) +"/"+ String(currentDate.getDate()) +"/"+ String(currentDate.getFullYear())
    console.log(todaydate)
    const requestBody = {
      zodiac: option1,
      category: option2,
      date: todaydate,
    };

    try {
      const response = await fetch("https://horoscope-prediction-production.up.railway.app/gethoroscope", {
      
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
    <div className="Horoscope">
      <h1>Horoscope Generator</h1>
      <p className="date">Today's Date: {new Date().toLocaleDateString()}</p>
      <div className="container">
        <label htmlFor="option1">Zodiac Sign </label>
        <select id="option1" value={option1} onChange={handleOption1Change}>
          <option value="aries" selected="selected">Aries</option>
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
      <div className="container">
        <label htmlFor="option2">Category </label>
        <select id="option2" value={option2} onChange={handleOption2Change}>
          <option value="general">General</option>
          <option value="career">Career</option>
          <option value="romantic">Romantic</option>
          <option value="social">Social</option>
          <option value="wellness">Wellness</option>
        </select>
      </div>
      <button className="submit-button" onClick={handleSubmit}>Get Your Horoscope</button>
      <div className="response-container">
        <p className="response-text">{responseText.replace(/['"]+/g, '')}</p>
      </div> 
      <p className="date">Share Your Horoscope!</p>
      <div className="container">
      <FacebookShareButton
        quote={responseText.replace(/['"]+/g, '')}
        url={'https://loquacious-fairy-6f076a.netlify.app/'}
        
      >
        <FacebookIcon size={50} round />
      </FacebookShareButton>
      <TwitterShareButton
        title={responseText.replace(/['"]+/g, '')}
        url={'https://loquacious-fairy-6f076a.netlify.app/'}
>
      <TwitterIcon size={50} round />
      </TwitterShareButton>
      <EmailShareButton
        subject={"Check out my Horoscope!"}
        body={responseText.replace(/['"]+/g, '')}
        url={'https://loquacious-fairy-6f076a.netlify.app/'}
>
      <EmailIcon size={50} round />
      </EmailShareButton>
    </div>
    
    </div>
 
  );
}


export default Horoscope;
