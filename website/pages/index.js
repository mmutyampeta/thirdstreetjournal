import React from "react";
import { BrowserRouter } from "react-router-dom";
import MyApp from "./_app";

export default function Home() {
  return (
    <>
      <BrowserRouter>
        <MyApp />
      </BrowserRouter>
    </>
  );
}
