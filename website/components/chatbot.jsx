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
    <>
      <div className="container mx-auto flex items-center justify-center pt-10">
        <h1 className="text-4xl text-gray-800 font-bold tracking-wider font-serif">
          Talk to AI
        </h1>
      </div>
      <div className="grid grid-cols-2 grid-flow-col gap-4">
        <div className="grid grid-rows-5 gap-4 p-10">
          <div className=" justify-center row-span-3 pl-10">
            <p className="text-2xl text-gray-800 font-serif tracking-wider leading-10 p-3">
              Explore the world of finance with our new chat feature, designed
              to make discussing financial matters feel like a natural
              conversation with a trusted friend. Need advice on investments or
              want to know more about current market trends? Just chat with our
              AI-driven financial assistant, and we'll guide you through it in a
              way that's easy to understand.
            </p>
          </div>
          <div className="flex items-center justify-center row-span-1">
            <button className="bg-gray-800 text-gray-200 hover:text-white font-bold py-2 px-4 rounded-full">
              <p className="text-2xl text-white-800 font-serif tracking-wider leading-10 p-1">
                Jump to chat
              </p>
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <img className="w-3/4" src="/Chatbot.png"></img>
        </div>
      </div>

      <div className="flex flex-col h-screen bg-gray-100">
        <div className="flex flex-col flex-grow overflow-y-auto p-8">
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
