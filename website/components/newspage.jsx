import React, { useState } from "react";
import NewsTile from "./newstile";

const NewsPage = () => {
  let [newsData, setNewsData] = useState([]);
  const [count, setCount] = useState(0);

  const pullNews = async () => {
    try {
      const url = "http://127.0.0.1:5050/news";
      const messageResponse = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (messageResponse.ok) {
        console.log("News information recieved successfully!");
        const responseBody = await messageResponse.json();
        setNewsData(JSON.parse(responseBody.text));
        console.log(newsData);
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

  if (count === 0) {
    setCount(1);
    pullNews();
  }

  return (
    <>
      <div className="container mx-auto mt-5 p-5">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-4xl font-bold font-serif mb-3">
            Today's Headlines
          </h1>
          <p className="text-lg font-serif text-center">
            Explore today's financial headlines at Third Street Journal
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 mt-10">
          {newsData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-300 p-5"
            >
              <h1 className="text-2xl font-bold font-serif mb-2">
                {item.title}
              </h1>
              <p className="text-lg font-serif mb-4">{item.description}</p>
              <a
                href={item.url}
                className="text-sm text-blue-500 font-serif hover:text-blue-900"
              >
                View full article
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewsPage;
