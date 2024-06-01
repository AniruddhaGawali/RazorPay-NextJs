'use client';
import * as React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Loading from '@/components/loading';

export default function Order() {
  const [orders, setOrders] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/order')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.productorder);
      });
  }, []);

  console.log(orders);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-5xl mb-10 font-semibold">Orders</h1>

      {orders.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-10">
            {orders.map((order) => (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>{order.product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center flex-col">
                    <img
                      src={order.product.img}
                      alt={order.product.name}
                      className="w-1/2"
                    />
                    <p className="text-lg font-medium mt-10 text-left w-full">
                      Rs. {order.totalAmount}
                    </p>
                    <p className="text-sm text-left w-full">
                      Date: {new Date(order.createdAt).getDate()}/
                      {new Date(order.createdAt).getMonth()}/
                      {new Date(order.createdAt).getFullYear()}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <span
                      className={`${
                        order.status == 'pending'
                          ? 'bg-yellow-500'
                          : order.status == 'fail'
                          ? 'bg-red-500'
                          : 'bg-green-600'
                      } py-1 px-2 rounded-full text-xs text-white`}
                    >
                      Status : {order.status}
                    </span>
                  </CardFooter>
                </Card>
              </>
            ))}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
}
