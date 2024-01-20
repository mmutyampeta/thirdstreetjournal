// Chatbot.js

import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    // Add user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, user: "user" },
    ]);

    // Simulate bot response (replace with actual bot logic)
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: "Bot response...", user: "bot" },
    ]);

    // Clear the input field
    setNewMessage("");
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white rounded-md shadow-md">
      <div className="flex flex-col h-96 overflow-y-auto border border-gray-300 rounded-md">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.user === "user" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <span
              className={`inline-block p-2 max-w-3/4 bg-gray-200 rounded-md ${
                message.user === "user" ? "bg-blue-500 text-white" : ""
              }`}
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
