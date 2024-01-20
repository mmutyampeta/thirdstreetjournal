import React from "react";

export default function Intro() {
  return (
    <>
      <div className="bg-gray-200 text-gray-800 p-8">
        <h1 className="text-4xl text-gray-800 font-bold tracking-wider font-serif text-center mb-4">
          Welcome to The Third Street Journal!
        </h1>
        <p className="text-center text-2xl text-gray-800 font-serif tracking-wider leading-10 p-3">
          This is your one-stop shop for financial news! This application
          extensively scrapes the internet for the latest financial news across
          the most reputable sources of news in the world. Through thorough AI
          processing, we developed a chat feature to look into any information
          that any analyst may want to research.
        </p>
      </div>
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
    </>
  );
}