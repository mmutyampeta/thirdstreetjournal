import React from "react";
import MyApp from "./_app";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <BrowserRouter>
        <MyApp />
      </BrowserRouter>
    </>
  );
}
