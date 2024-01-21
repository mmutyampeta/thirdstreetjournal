import "../styles/global.css";
import React, { useState } from "react";
import Header from "../components/header";
import NewsTile from "../components/newstile";
import Intro from "../components/intro";
import Chatbot from "../components/chatbot";
import TradingViewWidget from "../components/chart";
import Footer from "../components/footer";

const newsTiles = [
  {
    title: "Title 1",
    description: "Sample Description",
    url: "http://localhost:3000/",
  },
  {
    title: "Title 2",
    description: "Sample Description",
    url: "http://localhost:3000/",
  },
  {
    title: "Title 3",
    description: "Sample Description",
    url: "http://localhost:3000/",
  },
  {
    title: "Title 4",
    description: "Sample Description",
    url: "http://localhost:3000/",
  },
];

function MyApp() {
  const [selectedPage, setSelectedPage] = useState("home");
  return (
    <>
      <Header setSelectedPage={setSelectedPage} />

      {selectedPage === "home" && <NewsTile input={newsTiles[0]} />}
      {selectedPage === "about" && <Intro setSelectedPage={setSelectedPage} />}
      {selectedPage === "chat" && <Chatbot />}
      {selectedPage === "stocks" && <TradingViewWidget />}

      <div className="">
        <Footer setSelectedPage={setSelectedPage} />
      </div>
    </>
  );
}

export default MyApp;
