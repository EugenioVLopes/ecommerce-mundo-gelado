import dbConnect from "@/src/lib/dbConnect";
import Order from "@/src/models/Order";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    // Conectar ao banco de dados
    await dbConnect();

    // Buscar o pedido pelo ID
    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json({ message: "Pedido não encontrado." }, { status: 404 });
    }

    // Retornar o pedido encontrado
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    // Retornar mensagem de erro
    return NextResponse.json({ message: "Erro ao buscar o pedido." }, { status: 500 });
  }
}
