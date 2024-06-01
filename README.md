## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## APIs

1. `/api/order` POST Request
    - to create a Razorpay order and add it into cart

2. `/api/order` GET Request
    - to get all the orders

3. `/api/product` POST Request
    - to add new product

4. `/api/product` GET Request
    - to get all product list

5. `/api/payment-verfiy` POST Request
    - to verify the payment


## Schema

### Product Table

| Field       | Type     | Attributes                                                                 |
|-------------|----------|----------------------------------------------------------------------------|
| id          | String   | @id @default(auto()) @map("_id") @db.ObjectId                               |
| name        | String   |                                                                            |
| description | String   |                                                                            |
| img         | String   |                                                                            |
| price       | Float    |                                                                            |
| createdAt   | DateTime | @default(now())                                                            |

### Order Table

| Field       | Type     | Attributes                                                                 |
|-------------|----------|----------------------------------------------------------------------------|
| id          | String   | @id @default(auto()) @map("_id") @db.ObjectId                               |
| productId   | String   | @db.ObjectId                                                               |
| quantity    | Int      |                                                                            |
| totalAmount | Float    |                                                                            |
| status      | String   | @default("pending")                                                        |
| createdAt   | DateTime | @default(now())                                                            |
| updatedAt   | DateTime | @updatedAt                                                                 |

### Payment Table

| Field               | Type   | Attributes                                                           |
|---------------------|--------|----------------------------------------------------------------------|
| id                  | String | @id @default(auto()) @map("_id") @db.ObjectId                         |
| razorpay_order_id   | String |                                                                      |
| razorpay_payment_id | String |                                                                      |
| razorpay_signature  | String |                                                                      |

### Transaction Table

| Field     | Type     | Attributes                                                                 |
|-----------|----------|----------------------------------------------------------------------------|
| id        | String   | @id @default(auto()) @map("_id") @db.ObjectId                               |
| orderId   | String   | @db.ObjectId                                                               |
| amount    | Float    |                                                                            |
| status    | String   | @default("pending")                                                        |
| createdAt | DateTime | @default(now())                                                            |