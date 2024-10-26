import { NextRequest, NextResponse } from "next/server";
import { MenuItem } from "@/src/models/MenuItem";
import dbConnect from "@/src/lib/dbConnect";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const data = await req.json();
    const menuItemDoc = await MenuItem.create(data);
    return NextResponse.json(menuItemDoc);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar item do menu" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const menuItems = await MenuItem.find();
    return NextResponse.json(menuItems);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar itens do menu" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const data = await req.json();
    const menuItemDoc = await MenuItem.findByIdAndUpdate(data._id, data, {
      new: true,
    });
    
    if (!menuItemDoc) {
      return NextResponse.json(
        { error: "Item não encontrado" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(menuItemDoc);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar item do menu" },
      { status: 500 }
    );
  }
}
