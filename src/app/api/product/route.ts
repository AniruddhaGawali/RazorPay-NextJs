import prisma from '@/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        img: true,
        price: true,
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: 'Error in server' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { name, description, img, price } = await req.json();

  try {
    if (name && description && img && price) {
      await prisma.product.create({
        data: {
          name,
          description,
          img,
          price,
        },
      });

      return NextResponse.json({ messsage: 'Product Added' }, { status: 201 });
    } else {
      return NextResponse.json({ message: 'Missing Value' }, { status: 400 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: 'Error Occurs' }, { status: 500 });
  }
}
