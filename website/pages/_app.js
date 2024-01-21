import "../styles/global.css";
import React, { useState } from "react";
import Header from "../components/header";
import Intro from "../components/intro";
import Chatbot from "../components/chatbot";
import TradingViewWidget from "../components/chart";
import Footer from "../components/footer";

function MyApp() {
  const [selectedPage, setSelectedPage] = useState("home");
  return (
    <>
      <Header setSelectedPage={setSelectedPage} />
      {selectedPage === "home" && <Intro setSelectedPage={setSelectedPage} />}
      {selectedPage === "chat" && <Chatbot />}
      {selectedPage === "stocks" && <TradingViewWidget />}
      <div className="">
        <Footer setSelectedPage={setSelectedPage} />
      </div>
    </>
  );
}

export default MyApp;
