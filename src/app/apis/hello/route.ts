import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: Request) => {
  return new NextResponse(JSON.stringify({
    message: "Hello from the API"
  }));
};
