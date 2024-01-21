import React from "react";

export default function Intro({ setSelectedPage }) {
  return (
    <>
      <div className="border text-gray-800 p-8">
        <h1 className="text-4xl text-gray-800 font-bold tracking-wider font-serif text-center mb-4">
          Welcome to The Third Street Journal!
        </h1>
        <p className="text-center text-xl text-gray-800 font-serif tracking-wider leading-10 p-3">
          This is your one-stop shop for financial news! This application
          extensively scrapes the internet for the latest financial news across
          the most reputable sources of news in the world. You can read the
          insights of financial experts with the convenience of having an AI
          Expert by your side.
        </p>
        <div className="flex items-center justify-center p-5 row-span-1">
          <button
            className="bg-gray-800 text-white hover:text-gray-800 hover:bg-white hover:border hover:border-gray-800 font-bold py-2 px-4 rounded-full"
            onClick={() => setSelectedPage("home")}
          >
            <p className="text-2xl text-white-800 font-serif tracking-wider leading-10 p-1">
              Read Today's News
            </p>
          </button>
        </div>
      </div>

      <div className="bg-gray-800">
        <div className="container mx-auto flex items-center justify-center pt-10">
          <h1 className="text-4xl text-white font-bold tracking-wider font-serif">
            Talk to AI
          </h1>
        </div>
        <div className="grid grid-cols-2 grid-flow-col gap-4">
          <div className="grid grid-rows-5 gap-4 p-10">
            <div className=" justify-center row-span-3 pl-10">
              <p className="text-xl text-white font-serif tracking-wider leading-10 p-3">
                Explore the world of finance with our new chat feature, designed
                to make discussing financial matters feel like a natural
                conversation with a trusted friend. Need advice on investments
                or want to know more about current market trends? Just chat with
                our AI-driven financial assistant, and we'll guide you through
                it in a way that's easy to understand.
              </p>
            </div>
            <div className="flex items-center justify-center row-span-1">
              <button
                className="bg-white text-gray-600 hover:text-gray-900 font-bold py-2 px-4 rounded-full"
                onClick={() => setSelectedPage("chat")}
              >
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
      </div>

      <div className="border text-gray-800 p-8">
        <h1 className="text-4xl text-gray-800 font-bold tracking-wider font-serif text-center mb-4">
          Interactive Candlestick Visualization
        </h1>
        <p className="text-center text-xl text-gray-800 font-serif tracking-wider leading-10 p-3">
          Make informed decisions with a comprehensive analysis of market
          trends. Our feature is a key component of our robust financial
          analysis tool, providing you with the insights needed to navigate the
          complexities of stock markets. Whether you're a day trader, swing
          trader, or long-term investor, our Interactive Candlestick
          Visualization feature is designed to empower your investment journey.
          Stay ahead of the curve and make data-driven decisions with
          confidence.
        </p>
        <div className="flex items-center justify-center p-5 row-span-1">
          <button
            className="bg-gray-800 text-white hover:text-gray-800 hover:bg-white hover:border hover:border-gray-800 font-bold py-2 px-4 rounded-full"
            onClick={() => setSelectedPage("stocks")}
          >
            <p className="text-2xl text-white-800 font-serif tracking-wider leading-10 p-1">
              Candlestick Visualization
            </p>
          </button>
        </div>
      </div>
      <div>
        <p class="text-sm text-gray-500 sm:text-center dark:text-gray-400 p-2">
          All services are for informational purposes only and are not intended
          to provide personal financial advice. There is an inherent risk
          involved with financial decisions and Third Street Journal will not be
          held liable for decisions others make.
        </p>
      </div>
    </>
  );
}
