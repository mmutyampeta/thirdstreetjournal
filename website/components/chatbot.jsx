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
          <>
            <div className="h-screen grid grid-rows-4">
              <div className="flex items-center row-span-3 justify-center p-10">
                <button
                  className="bg-gray-800 text-white hover:text-gray-800 hover:bg-white hover:border hover:border-gray-800 font-bold py-2 px-4 rounded-full"
                  onClick={chatSetup}
                >
                  <p className="text-2xl text-white-800 font-serif tracking-wider leading-10 p-1">
                    Start Chat!
                  </p>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Chatbot;
