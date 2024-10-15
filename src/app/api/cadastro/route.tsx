import { User } from "../../../models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { pick } from "lodash";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, phone, address } = await req.json();
    const { street, number, complement, neighborhood, city, state, zipCode } =
      address;

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !street ||
      !number ||
      !neighborhood ||
      !city ||
      !state
    ) {
      return NextResponse.json(
        { message: "Todos os campos obrigatórios devem ser preenchidos." },
        { status: 400 } // Bad Request
      );
    }

    const mongoUrl = process.env.MONGO_URL || "";
    if (!mongoose.connection.readyState) {
      await mongoose.connect(mongoUrl);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Este email já está em uso." },
        { status: 400 } // Bad Request
      );
    }

    const createdUser = await User.create({
      name,
      email,
      password,
      phone,
      addresses: [
        {
          street,
          number,
          complement,
          neighborhood,
          city,
          state,
          zipCode,
        },
      ],
    });

    const userResponse = pick(createdUser.toObject(), [
      "id",
      "name",
      "email",
      "phone",
      "addresses",
    ]);

    return NextResponse.json(userResponse, { status: 201 }); // Created
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao cadastrar usuário.", error: error.message },
      { status: 500 } // Internal Server Error
    );
  }
}
