"use client";
import React, { useState } from "react";

const Page = () => {
  const [getHelloData, setGetHelloData] = useState<string>("");
  const [id, setId] = useState<number>(1); // Add a new state variable to store the ID of the hello message
  const getHello = async () => {
    // Fetch data from /api/hello , no need to specify the domain since it's going to be the same domain
    const res = await fetch(`/apis/hello/${id}`); // Change the URL to /apis/hello/1 
    const data = await res.json();
    setGetHelloData(data.message);
    setId(id + 1); // Increment the ID by 1
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
