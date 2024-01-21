import React from "react";

export default function NewsTile({ input }) {
  return (
    <>
      <div className="container p-3 mx-auto bg-gray-800 text-white flex text-gray-800 p-5 border border-gray-800 grid grid-rows-4 gap-2 grid-flow-col">
        <h1 className="text-2xl text-center font-bold font-serif row-span-1">
          {input.title}
        </h1>
        <p className="text-lg font-serif row-span-2">{input.description}</p>
        <a
          href={input.url}
          className="text-sm text-blue-500 font-serif hover: text-blue-900 row-span-1"
        >
          View full article
        </a>
      </div>
    </>
  );
}
