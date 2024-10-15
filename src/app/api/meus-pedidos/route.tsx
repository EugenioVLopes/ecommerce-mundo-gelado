import dbConnect from "@/src/lib/dbConnect";
import Order from "@/src/models/Order";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Conectar ao banco de dados
    await dbConnect();

    // Obter o token do usuário (autenticação)
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json(
        { message: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    // Obter os pedidos do usuário
    const orders = await Order.find({ "user.id": token.id });

    // Retornar os pedidos
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao obter os pedidos." },
      { status: 500 }
    );
  }
}
