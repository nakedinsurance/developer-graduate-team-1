import "./app.css";
import image from "./bot_image.jpg";
import { useState} from "react";

function CustomerSupport() {

  const [humanMessage, setHumanMessage] = useState("");
  const [botMessage, setBotMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleInput = async () => {
    if (!inputValue.trim()) return;
    console.log(inputValue);

    setHumanMessage(inputValue); // Set the human's message

    try {
      // Send the user's message to the API
      const response = await fetch("http://localhost:8000/api/customer-support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage: inputValue }),
      });

      const data = await response.json();

      if (response.ok) {
        // Display the bot's response
        setBotMessage(data.botResponse); // Assuming the response has a `reply` field
      } else {
        setBotMessage("Sorry, something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setBotMessage("Failed to connect to the server.");
    }

    // Clear the input field
    setInputValue("");
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="content">
          <div className="header">
            <div className="img">
              <img src={image} alt="" />
            </div>
            <div className="right">
              <div className="name">Customer Support</div>
              <div className="status" style={{ color: "green" }}>
                Active
              </div>
            </div>
          </div>
          <div className="main">
            <div className="main_content">
              <div className="messages">
                <div className="bot-message">{botMessage}</div>
                <div className="human-message">{humanMessage}</div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="btm">
              <div className="input">
                <input
                  type="text"
                  placeholder="Enter your message"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div className="">
                <button onClick={handleInput}>
                  <i className="fas fa-paper-plane"></i>Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerSupport;
