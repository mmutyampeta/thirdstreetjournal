import React from "react";

export default function NewsTile({ input }) {
  return (
    <>
      <a
        href={input.url}
        className="container p-3 mx-auto flex items-center justify-center"
      >
        <button className="text-gray-800 p-5 border border-gray-800">
          <h1 className="text-2xl font-bold font-serif">{input.title}</h1>
          <p className="text-lg font-serif">{input.description}</p>
        </button>
      </a>
    </>
  );
}
