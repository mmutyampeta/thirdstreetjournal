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

    console.log(messages);
    // Simulate bot response (replace with actual bot logic)
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: "Bot response...", user: "bot" },
    ]);

    // Clear the input field
    setNewMessage("");
  };

  return (
    <>
      <div className="flex flex-col h-screen p-5">
        <div className="flex flex-col flex-grow bg-gray-500 overflow-y-auto p-8">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.user === "user" ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <span
                className={`inline-block p-3 max-w-3/4 bg-gray-200 rounded-md ${
                  message.user === "user" ? "bg-blue-500 text-white" : ""
                }`}
              >
                {message.text}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center p-4">
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
    </>
  );
};

export default Chatbot;
