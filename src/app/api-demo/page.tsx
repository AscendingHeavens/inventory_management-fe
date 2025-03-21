"use client";
import React, { useState } from "react";

const Page = () => {
  const [getHelloData, setGetHelloData] = useState<string>("");
  const getHello = async () => {
    // Fetch data from /api/hello , no need to specify the domain since it's going to be the same domain
    const res = await fetch("/apis/hello");
    const data = await res.json();
    setGetHelloData(data.message);
  };
  return (
    <div>
      <h1>API Demo</h1>
      <button onClick={getHello}>Get Hello</button>
      <div>{getHelloData}</div>
    </div>
  );
};

export default Page;
