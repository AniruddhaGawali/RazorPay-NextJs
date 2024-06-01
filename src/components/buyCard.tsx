import * as React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export interface IBuyCardProps {
  product: Product;
}

export function BuyCard(props: IBuyCardProps) {
  const router = useRouter()


  const makePayment = async (product: Product) => {
    const key = process.env.RAZORPAY_API_KEY;
    console.log(product);
    const data = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(product),
    });

    const { order, transaction } = await data.json();

    const options = {
      key: key,
      name: 'Aniruddha',
      currency: order.currency,
      amount: order.amount,
      order_id: order.id,
      description: 'RazorPay Integration',
      // image: logoBase64,
      handler: async function (response: any) {
        console.log(response);

        const data = await fetch('/api/payment-verify', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            transaction,
          }),
        });

        const res = await data.json();

        console.log('response verify==', res);

        if (res?.message == 'success') {
          router.push('/order');
        }
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();

    paymentObject.on('payment.failed', function (response: any) {
      console.log(response);
      alert('Payment failed. Please try again. Contact support for help');
    });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{props.product.name}</CardTitle>
          <CardDescription>{props.product.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center flex-col">
          <img
            src={props.product.img}
            alt={props.product.name}
            className="w-2/3"
          />
          <p className="text-lg font-semibold mt-10 text-left w-full">
            Rs. {props.product.price}
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => makePayment(props.product)}>Buy Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
