import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import { authOptions } from "../auth/[...nextauth]/auth-options";
import dbConnect from "@/src/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { IUser, User } from "@/src/models/User";

export async function PUT(req: NextRequest) {
  console.log("PUT request received");
  try {
    // Conecta ao banco de dados
    await dbConnect();

    // Verifica se o usuário está autenticado
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }

    // Verifica se o corpo da requisição contém dados
    const data = await req.json();
    if (!data) {
      return NextResponse.json(
        { message: "Dados inválidos." },
        { status: 400 }
      );
    }

    // Campos permitidos para atualização
    const allowedFields: (keyof IUser)[] = ["name", "phone", "addresses"];
    // Cria um objeto com os campos permitidos
    const updateData: Partial<IUser> = {};
    // Adiciona ao objeto apenas os campos permitidos
    allowedFields.forEach((field) => {
      if (field in data) {
        updateData[field] = data[field];
      }
    });

    // Atualiza o perfil do usuário
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    // Verifica se o usuário foi encontrado
    if (!updatedUser) {
      return NextResponse.json(
        { message: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    // Remova a senha antes de enviar a resposta
    const { password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      message: "Perfil atualizado com sucesso.",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Erro ao atualizar o perfil:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor.", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Conecta ao banco de dados
    await dbConnect();

    // Verifica se o usuário está autenticado
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
    }

    // Procura o usuário no banco de dados
    const user = await User.findOne({ email: session.user.email }).lean();

    // Verifica se o usuário foi encontrado
    if (!user) {
      return NextResponse.json(
        { message: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    // Remova a senha antes de enviar a resposta
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Erro ao buscar o perfil:", error);
    return NextResponse.json(
      { message: "Erro interno do servidor.", error: (error as Error).message },
      { status: 500 }
    );
  }
}

// export async function POST(req: NextRequest) {
//   const data = await req.formData();
//   const session = await getServerSession(authOptions);

//   // Verifica se o usuário está autenticado
//   if (!session || !session.user?.email) {
//     return NextResponse.json({ message: "Não autorizado." }, { status: 401 }); // Unauthorized
//   }

//   // Verifica se o arquivo foi enviado
//   if (!data.has("avatar")) {
//     return NextResponse.json(
//       { message: "Nenhum arquivo enviado." },
//       { status: 400 }
//     );
//   }

//   const file = data.get("avatar");

//   // Verifica se o arquivo é válido
//   if (!file) {
//     return NextResponse.json({ message: "Arquivo inválido." }, { status: 400 });
//   }

//   try {
//     // Conecta ao banco de dados
//     await connectToDatabase();

//     // Procura o usuário no banco de dados
//     const user = await User.findOne({ email: session.user.email });
//     console.log("User:", user);

//     // Verifica se o usuário existe
//     if (!user) {
//       return NextResponse.json(
//         { message: "Usuário não encontrado." },
//         { status: 404 }
//       );
//     }

//     // Atualiza o avatar do usuário
//     const avatar = await User.updateOne(
//       { email: session.user.email },
//       { $set: { avatar: file } },
//       { new: true, runValidators: true }
//     );

//     return NextResponse.json(
//       { message: "Avatar atualizado com sucesso." },
//       { status: 200 } // OK
//     );
//   } catch (error) {
//     console.error("Erro ao atualizar o avatar:", error);
//     return NextResponse.json(
//       { message: "Erro interno do servidor." },
//       { status: 500 } // Internal Server Error
//     );
//   }
// }
