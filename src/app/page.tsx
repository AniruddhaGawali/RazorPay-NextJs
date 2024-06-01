'use client';
import { BuyCard } from '@/components/buyCard';
import Loading from '@/components/loading';
import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/product')
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-5xl font-semibold mb-10">Shop</h1>
      <div
        className="fixed top-10 right-10 hover:bg-gray-300 rounded-full p-2 border cursor-pointer"
        onClick={() => router.push('/order')}
      >
        <ShoppingBag />
      </div>

      {products.length > 0 ? (
        <div
          className="grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          gap-4"
        >
          {products.map((product) => (
            <BuyCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </main>
  );
}
