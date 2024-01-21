import React from "react";
import NewsTile from "./newstile";

export default function NewsPage({ input }) {
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
        {input.map((item) => (
          <div>
            <NewsTile input={item} />
          </div>
        ))}
      </div>
    </>
  );
}
