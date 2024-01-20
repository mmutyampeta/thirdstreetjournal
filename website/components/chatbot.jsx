// Chatbot.js

import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    // Add user message to the chat
    setMessages([...messages, { text: newMessage, user: "user" }]);
    // Simulate bot response (you may replace this with actual bot logic)
    setMessages([...messages, { text: "Bot response...", user: "bot" }]);
    // Clear the input field
    setNewMessage("");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md shadow-md">
      <div className="h-40 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.user === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block p-2 bg-${
                message.user === "user" ? "blue" : "green"
              }-500 text-white rounded-md`}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 bg-blue-500 text-white rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
