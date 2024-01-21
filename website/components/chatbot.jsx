import React, { useState } from "react";
import Box from "./boxchat";

const Chatbot = () => {
  const [renderChatBox, setRenderChatBox] = useState(false);

  const chatSetup = async () => {
    try {
      const setupResponse = await fetch("http://127.0.0.1:5050/setupchat", {
        method: "POST", // Change the method to POST
        headers: {
          "Content-Type": "application/json",
        },
        // You can include a request body if needed
        body: JSON.stringify({}),
      });

      if (setupResponse.ok) {
        console.log("Chat setup successful");
        setRenderChatBox(true);
        // Handle success, e.g., navigate to the chat page
      } else {
        console.error("Chat setup failed");
        // Handle failure
      }
    } catch (error) {
      console.error("Error during chat setup:", error);
      // Handle error
    }
  };

  return (
    <>
      <div>
        {renderChatBox ? (
          <Box />
        ) : (
          <button
            onClick={chatSetup}
            className="bg-gray-800 text-white hover:text-gray-900 font-bold py-2 px-4 rounded-full"
          >
            Start Chat!
          </button>
        )}
      </div>
    </>
  );
};

export default Chatbot;
