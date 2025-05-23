# Supermarket Management System

A full-stack supermarket management system built with Spring Boot and React, featuring a modern UI and robust backend architecture.

## 🚀 Features

- **Customer Management**
  - Add, edit, and delete customer records
  - View customer details including name, phone, email
  - Secure password handling
  - Responsive customer data table

- **Modern UI/UX**
  - Clean and intuitive interface
  - Responsive design using Tailwind CSS
  - Real-time data updates
  - Form validation and error handling

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Axios for API calls
- Tailwind CSS for styling
- Modern ES6+ JavaScript

### Backend
- Spring Boot 3.4.5
- Spring Data JPA
- PostgreSQL Database
- Lombok for boilerplate reduction
- Spring Web
- Spring DevTools

## 📋 Prerequisites

- Java 17 or higher
- Node.js and npm
- PostgreSQL
- Maven

## 🚀 Getting Started

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/sm-junior0/bn-supermarket-online-shop.git
```

2. Navigate to the backend directory
```bash
cd supermarket
```

3. Configure PostgreSQL
   - Create a database named `supermarket`
   - Update `application.properties` with your database credentials

4. Run the Spring Boot application
```bash
mvn spring-boot:run
```

The backend server will start at `http://localhost:8081`

### Frontend Setup

1. Navigate to the frontend directory
```bash
cd supermarket-vite-frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 📁 Project Structure

```
supermarket/
├── src/                    # Backend source code
│   ├── main/
│   │   ├── java/
│   │   └── resources/
│   └── test/
├── supermarket-vite-frontend/
│   ├── src/
│   │   ├── components/
│   │   └── App.jsx
│   └── package.json
└── pom.xml
```

## 🔧 Configuration

### Backend Configuration
- Database configuration in `application.properties`
- API endpoints available at `http://localhost:8081/api`

### Frontend Configuration
- API base URL configured in components
- Environment variables in `.env` file

## 🧪 Testing

### Backend Tests
```bash
mvn test
```

### Frontend Tests
```bash
npm test
```

## 📝 API Documentation

### Base URL
```
http://localhost:8081/api
```

### Customer Endpoints

#### Get All Customers
- **URL**: `/customers`
- **Method**: `GET`
- **Description**: Retrieves a list of all customers
- **Response**: Array of customer objects
- **Example Response**:
```json
[
  {
    "id": 1,
    "firstname": "John Doe",
    "phone": "+1234567890",
    "email": "john@example.com"
  }
]
```

#### Create Customer
- **URL**: `/customers`
- **Method**: `POST`
- **Description**: Creates a new customer
- **Request Body**:
```json
{
  "firstname": "John Doe",
  "phone": "+1234567890",
  "email": "john@example.com",
  "password": "securepassword"
}
```
- **Response**: Created customer object with ID

#### Update Customer
- **URL**: `/customers/{id}`
- **Method**: `PUT`
- **Description**: Updates an existing customer
- **URL Parameters**: `id` - Customer ID
- **Request Body**: Same as Create Customer
- **Response**: Updated customer object

#### Delete Customer
- **URL**: `/customers/{id}`
- **Method**: `DELETE`
- **Description**: Deletes a customer
- **URL Parameters**: `id` - Customer ID
- **Response**: 204 No Content

### Product Endpoints

#### Get All Products
- **URL**: `/products`
- **Method**: `GET`
- **Description**: Retrieves a list of all products
- **Response**: Array of product objects

#### Create Product
- **URL**: `/products`
- **Method**: `POST`
- **Description**: Creates a new product
- **Request Body**:
```json
{
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "stock": 100
}
```

#### Update Product
- **URL**: `/products/{id}`
- **Method**: `PUT`
- **Description**: Updates an existing product
- **URL Parameters**: `id` - Product ID
- **Request Body**: Same as Create Product

#### Delete Product
- **URL**: `/products/{id}`
- **Method**: `DELETE`
- **Description**: Deletes a product
- **URL Parameters**: `id` - Product ID

### Order Endpoints

#### Get All Orders
- **URL**: `/orders`
- **Method**: `GET`
- **Description**: Retrieves a list of all orders
- **Response**: Array of order objects

#### Create Order
- **URL**: `/orders`
- **Method**: `POST`
- **Description**: Creates a new order
- **Request Body**:
```json
{
  "customerId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}
```

#### Get Order by ID
- **URL**: `/orders/{id}`
- **Method**: `GET`
- **Description**: Retrieves a specific order
- **URL Parameters**: `id` - Order ID

#### Update Order Status
- **URL**: `/orders/{id}/status`
- **Method**: `PATCH`
- **Description**: Updates the status of an order
- **URL Parameters**: `id` - Order ID
- **Request Body**:
```json
{
  "status": "COMPLETED"
}
```

### Authentication Endpoints

#### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticates a user
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password"
}
```
- **Response**: JWT token

#### Register
- **URL**: `/auth/register`
- **Method**: `POST`
- **Description**: Registers a new user
- **Request Body**: Same as Create Customer

### Error Responses

All endpoints may return the following error responses:

- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Missing or invalid authentication
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side error

### Authentication

Most endpoints require authentication using a JWT token. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details

## 👥 Authors

- Your Name - SHEJA MANENE Junior

## 🙏 Acknowledgments

- Spring Boot Team
- React Team
- Tailwind CSS Team
