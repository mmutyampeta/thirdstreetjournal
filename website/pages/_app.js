import "../styles/global.css";
import React, { useState } from "react";
import Header from "../components/header";
import NewsPage from "../components/newspage";
import Intro from "../components/intro";
import Chatbot from "../components/chatbot";
import TradingViewWidget from "../components/chart";
import Footer from "../components/footer";
import Head from "next/head";

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
  {
    title: "Title 5",
    description: "Sample Description",
    url: "http://localhost:3000/",
  },
  {
    title: "Title 6",
    description: "Sample Description",
    url: "http://localhost:3000/",
  },
  {
    title: "Title 7",
    description: "Sample Description",
    url: "http://localhost:3000/",
  },
  {
    title: "Title 8",
    description: "Sample Description",
    url: "http://localhost:3000/",
  },
];

function MyApp() {
  const [selectedPage, setSelectedPage] = useState("home");
  return (
    <>
      <Head>
        <title>Third Street Journal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header setSelectedPage={setSelectedPage} />

      {selectedPage === "home" && <NewsPage input={newsTiles} />}
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
