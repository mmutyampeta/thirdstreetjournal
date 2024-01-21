import React, { useState } from "react";
import NewsTile from "./newstile";

const NewsPage = () => {
  let [newsData, setNewsData] = useState({})

  const pullNews = async () => {
    try {
      const url = (
        "http://127.0.0.1:5050/news"
      )
      const messageResponse = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((response) => {
        setNewsData(JSON.parse(response.text))
      });

      if (messageResponse.ok) {
        console.log("News information recieved successfully!");
        const responseBody = await messageResponse.json();
        setNewsData(JSON.parse(responseBody.text));
        console.log(newsData)
        // Handle success, e.g., navigate to the chat page
      } else {
        console.error("DB response failed!");
        // Handle failure
      }
    } catch (error) {
      console.error("Error occurred during messaging!:", error);
      // Handle error
    }
  };

  pullNews();

  return (
    <>
      <div className="container mx-auto flex items-center justify-center pt-5 grid grid-rows-2 grid-flow-rows">
        <h1 className="text-4xl font-bold font-serif text-center">
          Today's Headlines
        </h1>
        <p className="text-lg font-serif text-center">
          Explore today's financial headlines at Third Street Journal
        </p>
      </div>
      <div className="grid grid-cols-2 grid-flow-row gap-10 p-10 px-40">
        {newsData.map((item) => (
          <div>
            <NewsTile input={item} />
          </div>
        ))}
      </div>
    </>
  );
}

export default NewsPage;
