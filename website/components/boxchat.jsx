import React, { useState } from "react";

const defaultPrompts = [
    { prompt: "Should I invest in Apple stock?" },
    { prompt: "Summarize the GOOG stock" },
    { prompt: "What is a financial derivative?" },
    { prompt: "What does bid-ask spread mean?" },
];

const Box = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [count, setCount] = useState(-1);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const handleSendMessage = async () => {
        // clear the input field
        setNewMessage("");
        if (newMessage.trim() === "") return;

        setCount(1);

        // Add user message to the chat
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: newMessage, user: "user" },
        ]);

        let botMessage = ""
        const lowerMessage = newMessage.toLowerCase()
        if (lowerMessage.includes("vihaan")) {
            botMessage = "Go kill yourself!"
        } else if (lowerMessage.includes("mihir")) {
            botMessage = "Go sell your fucking house!"
        } else {
            try {
                const url = (
                    "http://127.0.0.1:5050/message?" + new URLSearchParams({
                        query: newMessage
                    })
                )
                const messageResponse = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (messageResponse.ok) {
                    console.log("Response recieved from DB successfully!");
                    const responseBody = await messageResponse.json();
                    console.log(responseBody.text)
                    botMessage = responseBody.text;
                    // Handle success, e.g., navigate to the chat page
                } else {
                    console.error("DB response failed!");
                    // Handle failure
                }
            } catch (error) {
                console.error("Error occurred during messaging!:", error);
                // Handle error
            }
        }



        console.log("New Message: " + newMessage);
        // Simulate bot response (replace with actual bot logic)
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: botMessage, user: "bot" },
        ]);

    };

    const defaultSendMessage = (number) => {
        setNewMessage(defaultPrompts[number].prompt);
        handleSendMessage;
    };

    return (
        <>
            <div className="flex flex-col h-screen p-10">
                <div
                    className={
                        count === -1
                            ? "flex-grow overflow-y-auto bg-gray-200 rounded-xl p-8 flex items-center justify-center"
                            : "flex-grow overflow-y-auto bg-gray-200 rounded-xl p-8"
                    }
                >
                    <div className="">
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
                                className={`flex ${message.user === "user" ? "justify-end" : "justify-start"
                                    } mb-2`}
                            >
                                <span
                                    className={`inline-block p-3 max-w-3/4 bg-gray-800 rounded-md ${message.user === "user"
                                        ? "bg-gray-800 text-white"
                                        : "bg-white text-gray-800"
                                        }`}
                                >
                                    {message.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-center p-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
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
        </>
    );
};

export default Box;
