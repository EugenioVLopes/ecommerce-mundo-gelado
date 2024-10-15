import { NextRequest, NextResponse } from 'next/server';
import { MenuItem } from '@/src/models/MenuItem';
import dbConnect from '@/src/lib/dbConnect';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  
  const { id } = params;  // Captura o ID da URL
  const menuItem = await MenuItem.findById(id);

  if (!menuItem) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json(menuItem);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = params;  // Captura o ID da URL
  const data = await req.json();
  const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, data, { new: true });

  if (!updatedMenuItem) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json(updatedMenuItem);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = params;  // Captura o ID da URL
  const deletedMenuItem = await MenuItem.findByIdAndDelete(id);

  if (!deletedMenuItem) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Item deleted successfully' });
}
