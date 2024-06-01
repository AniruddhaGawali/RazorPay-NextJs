import prisma from '@/prisma-client';
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { Orders } from 'razorpay/dist/types/orders';
import shortid from 'shortid';

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function GET() {
  const order = await prisma.order.findMany({
    select: {
      id: true,
      productId: true,
      status: true,
      totalAmount: true,
      createdAt: true,
    },
  });

  const product = await prisma.product.findMany({
    where: {
      id: {
        in: order.map((order) => order.productId),
      },
    },
  });

  const productorder = order.map((item, i) => {
    return {
      id: item.id,
      status: item.status,
      totalAmount: item.totalAmount,
      product: product.filter((i) => i.id == item.productId)[0],
      createdAt: item.createdAt,
    };
  });

  return NextResponse.json({ productorder }, { status: 200 });
}

export async function POST(req: Request) {
  const data = await req.json();
  console.log(data);
  const payment_capture = 1;
  const amount = data.price * 100;
  const currency = 'INR';

  const option: Orders.RazorpayOrderCreateRequestBody = {
    amount,
    currency,
    receipt: shortid.generate(),
    notes: {
      payment_capture,
    },
  };
  const order = await instance.orders.create(option);
  const productOrder = await prisma.order.create({
    data: {
      productId: data.id,
      quantity: 1,
      totalAmount: data.price,
    },
  });

  const transaction = await prisma.transaction.create({
    data: {
      amount: productOrder.totalAmount,
      orderId: productOrder.id,
    },
  });

  return NextResponse.json(
    { msg: 'success', order, transaction },
    { status: 200 }
  );
}
