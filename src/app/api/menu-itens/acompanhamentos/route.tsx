import { MenuItem } from "@/src/models/MenuItem";
import dbConnect from "@/src/lib/dbConnect";

export async function GET() {
  await dbConnect();

  const query = { category: "Acompanhamentos" };

  const menuItems = await MenuItem.find(query);

  return Response.json(menuItems);
}
