import { NextRequest, NextResponse } from "next/server";
import { Category, CategoryDocument } from "../../../models/Category";
import dbConnect from "@/src/lib/dbConnect";

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      description,
      image,
    }: { name: string; description?: string; image?: string } =
      await request.json();

    if (!name) {
      return NextResponse.json(
        { message: "O nome da categoria é obrigatório." },
        { status: 400 }
      );
    }

    const newCategory: CategoryDocument = await Category.create({
      name,
      description,
      image,
    });

    return NextResponse.json(
      { message: "Categoria adicionada com sucesso", category: newCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Um erro ocorreu ao tentar criar a categoria." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  await dbConnect();

  try {
    const categories = await Category.find();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Um erro ocorreu ao tentar buscar as categorias." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const {
      name,
      description,
      image,
      id,
    }: { id: number; name: string; description?: string; image?: string } =
      await request.json();

    if (!name) {
      return NextResponse.json(
        { message: "O nome da categoria é obrigatório." },
        { status: 400 }
      );
    }

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { message: "Categoria não encontrada." },
        { status: 404 }
      );
    }

    category.name = name;
    category.description = description;
    category.image = image;

    await category.save();

    return NextResponse.json(
      { message: "Categoria atualizada com sucesso", category },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Um erro ocorreu ao tentar atualizar a categoria." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();

  const body = await req.json();

  const { id } = body;

  const deleteCategory = await Category.findByIdAndDelete(id);

  if (!deleteCategory) {
    return NextResponse.json(
      { error: "Categoria não encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { message: "Categoria deletada com sucesso" },
    { status: 200 }
  );
}
