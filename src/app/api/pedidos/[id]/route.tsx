import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { revalidateTag } from "next/cache";
import dbConnect from "@/src/lib/dbConnect";
import Order from "@/src/models/Order";
import { User } from "@/src/models/User";

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  await dbConnect();

  const token = await getToken({ req });
  if (!token || !token.email) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const user = await User.findOne({ email: token.email });
  if (user?.role !== "admin") {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const { id } = params;

  try {
    const { status } = await req.json();
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { message: "Pedido não encontrado" },
        { status: 404 }
      );
    }

    revalidateTag("orders");

    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao atualizar o pedido" },
      { status: 500 }
    );
  }
}
