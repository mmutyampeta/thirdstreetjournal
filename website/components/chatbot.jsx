import React, { useState } from "react";

const defaultPrompts = [
  { prompt: "Find relevant news articles" },
  { prompt: "Look up XYZ Stock" },
  { prompt: "Find relevant news articles" },
  { prompt: "Find relevant news articles" },
];

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [count, setCount] = useState(-1);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    setCount(1);

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

  const defaultSendMessage = (number) => {
    setNewMessage(defaultPrompts[number].prompt);
    handleSendMessage;
  };

  return (
    <>
      <div className="flex flex-col h-screen p-10">
        <div className="flex flex-col grid grid-rows-10 grid-flow-col flex-grow overflow-y-auto p-8 bg-gray-200 rounded-2xl ">
          <div className="justify-center items-center row-span-10">
            {count === -1 && (
              <div className="flex items-center justify-center grid grid-rows-2 grid-flow-col">
                <h1 className="text-3xl font-bold text-white-800 row-span-1 text-center">
                  How can I help you today?
                </h1>
                <div className="grid grid-rows-2 grid-flow-col gap-5">
                  <div className="grid grid-cols-2 grid-flow-row gap-5">
                    <button
                      onClick={() => defaultSendMessage(0)}
                      className="bg-transparent hover:bg-gray-800 text-gray-800 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded"
                    >
                      <h2>{defaultPrompts[0].prompt}</h2>
                    </button>
                    <button
                      onClick={() => defaultSendMessage(1)}
                      className="bg-transparent hover:bg-gray-800 text-gray-800 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded"
                    >
                      <h2>{defaultPrompts[1].prompt}</h2>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 grid-flow-row gap-5">
                    <button
                      onClick={() => defaultSendMessage(2)}
                      className="bg-transparent hover:bg-gray-800 text-gray-800 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded"
                    >
                      <h2>{defaultPrompts[2].prompt}</h2>
                    </button>
                    <button
                      onClick={() => defaultSendMessage(3)}
                      className="bg-transparent hover:bg-gray-800 text-gray-800 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded"
                    >
                      <h2>{defaultPrompts[3].prompt}</h2>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.user === "user" ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <span
                  className={`inline-block p-3 max-w-3/4 bg-blue-500 rounded-md ${
                    message.user === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 absolute bottom-0 w-5/6 flex items-center justify-center p-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow p-2 border bg-transparent border-gray-800 rounded-md focus:outline-none"
              placeholder="Ask AI"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 p-2 bg-transparent hover:bg-gray-800 text-gray-800 font-semibold hover:text-white py-2 px-4 border border-gray-800 hover:border-transparent rounded"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
