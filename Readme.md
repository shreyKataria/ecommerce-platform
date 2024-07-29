# E-Commerce Platform

## Setup

### Backend

1. Clone the repository
2. Run `npm install`
3. Set up MongoDB and Supabase
4. Add environment variables in a `.env` file
5. Run `node index.js`

### Frontend

- `yet to implement`

## API Endpoints

### User

- `POST /api/register`
- `POST /api/login`

### Products

- `POST /api/products` (admin)
- `GET /api/products`
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)

### Cart

- `POST /api/cart`
- `GET /api/cart`

### Orders

- `POST /api/orders`
- `GET /api/orders`

### Sessions

- `GET /api/sessions`

### Payment

- `POST /api/payment`

## Role-Based Access Control

- Users have roles (`user` or `admin`)
- Admins can manage products

## Payment Processing

- Integrated with mock(stripe) payment gateway API using nock
- `npm i nock`

## Contribution

- open for contribution fork the repo and send PR
