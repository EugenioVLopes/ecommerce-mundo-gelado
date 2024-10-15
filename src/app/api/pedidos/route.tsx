import dbConnect from "@/src/lib/dbConnect";
import Order from "@/src/models/Order"; // Modelo de Pedido
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { IAddress } from "@/src/models/User";
import { MenuItem, SizeOption } from "@/src/models/MenuItem";
import { revalidateTag } from "next/cache";
export interface ICartProduct {
  _id: string;
  product: MenuItem;
  quantity: number;
  selectedSize: SizeOption;
  selectedCreams: string[];
  selectedFruits: string[];
  selectedToppings: string[];
}

export async function POST(req: NextRequest) {
  try {
    // Conectar ao banco de dados
    await dbConnect();

    // Recuperar os dados do corpo da requisição
    const {
      cartProducts,
      address,
      total,
      paymentMethod,
      change,
    }: {
      cartProducts: ICartProduct[];
      address: IAddress;
      total: number;
      paymentMethod: string;
      change: number;
    } = await req.json();

    // Verificar se os dados são válidos
    if (!cartProducts || !address) {
      return NextResponse.json(
        { message: "Pedido inválido." },
        { status: 400 }
      );
    }

    // Obter o token do usuário (autenticação)
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json(
        { message: "Usuário não autenticado." },
        { status: 401 }
      );
    }

    // Mapear os produtos do carrinho para o formato necessário
    const items = cartProducts.map((product: any) => ({
      id: product.product._id, // ID do produto
      product: product.product, // Dados do produto
      quantity: product.quantity || 1, // Quantidade do produto
      // selectedSize: product.selectedSize, // Tamanho selecionado
      // selectedCreams: product.selectedCreams, // Cremes selecionados
      // selectedFruits: product.selectedFruits, // Frutas selecionadas
      // selectedToppings: product.selectedToppings, // Acompanhamentos selecionados
    }));

    // Criar o pedido
    const newOrder = new Order({
      user: token,
      items,
      total,
      address,
      paymentMethod,
      change,
      status: "pending",
    });

    // Salvar o pedido no banco de dados
    await newOrder.save();

    revalidateTag("orders");

    // Retornar a resposta de sucesso
    return NextResponse.json(
      { message: "Pedido realizado com sucesso!", order: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao processar o pedido." },
      { status: 500 }
    );
  }
}

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

    // Buscar os pedidos do usuário
    const orders = await Order.find({}).sort({
      createdAt: -1,
    });

    // Retornar os pedidos
    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao buscar os pedidos." },
      { status: 500 }
    );
  }
}
