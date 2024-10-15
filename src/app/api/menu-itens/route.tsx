import { NextRequest, NextResponse } from "next/server";
import { MenuItem } from "@/src/models/MenuItem";
import dbConnect from "@/src/lib/dbConnect";

export async function POST(req: NextRequest, res: NextResponse) {
  await dbConnect();

  const data = await req.json();
  const menuItemDoc = await MenuItem.create(data);
  return Response.json(menuItemDoc);
}

export async function GET(req: NextRequest, res: NextResponse) {
  await dbConnect();
  const menuItems = await MenuItem.find();
  return Response.json(menuItems);
}

export async function PUT(req: NextRequest, res: NextResponse) {
  await dbConnect();
  const data = await req.json();
  const menuItemDoc = await MenuItem.findByIdAndUpdate(data._id, data, {
    new: true,
  });
  return Response.json(menuItemDoc);
}
