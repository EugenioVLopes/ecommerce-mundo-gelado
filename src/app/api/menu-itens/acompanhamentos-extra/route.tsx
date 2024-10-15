import { MenuItem } from "@/src/models/MenuItem";
import dbConnect from "@/src/lib/dbConnect";

export async function GET() {
  await dbConnect();

  const query = { category: "Adicionais Premiun" };
  const menuItemsAdicionaisPremiun = await MenuItem.find(query);

  query.category = "Acompanhamentos";
  const menuItemsAcompanhamentos = await MenuItem.find(query);

  query.category = "Frutas";
  const menuItemsFrutas = await MenuItem.find(query);

  const menuItems = [
    ...menuItemsAdicionaisPremiun,
    ...menuItemsAcompanhamentos,
    ...menuItemsFrutas,
  ];

  return Response.json(menuItems);
}
