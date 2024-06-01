import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prisma from '@/prisma-client';

export async function POST(req: Request) {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    transaction,
  } = await req.json();

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  console.log('id==', body);

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    await prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        status: 'success',
      },
    });

    await prisma.order.update({
      where: {
        id: transaction.orderId,
      },
      data: {
        status: 'success',
      },
    });

    await prisma.payment.create({
      data: {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      },
    });

    return NextResponse.json({ message: 'success' }, { status: 201 });
  } else {
    await prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        status: 'fail',
      },
    });

    await prisma.order.update({
      where: {
        id: transaction.orderId,
      },
      data: {
        status: 'fail',
      },
    });

    return NextResponse.json(
      {
        message: 'fail',
      },
      {
        status: 400,
      }
    );
  }
}
