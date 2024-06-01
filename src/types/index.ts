type Product = {
  id: string;
  name: string;
  description: string;
  img: string;
  price: number;
};

type Order = {
  id: string;
  productId: string;
  quantiy: number;
  totalAmount: number;
  status: string;
};

type Transaction = {
  id: string;
  orderId: string;
  amount: number;
  status: string;
};
