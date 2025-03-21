import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const id  = req.url.split('hello/')[1];
  return new NextResponse(JSON.stringify({
    message: `Hello from the API ${id}`
  }));
};
