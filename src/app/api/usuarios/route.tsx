import dbConnect from "@/src/lib/dbConnect";
import { User } from "@/src/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  await dbConnect();
  const usuarios = await User.find();
  return Response.json(usuarios);
}
