# Smart Grocery Cart

A microservices-based online grocery shopping application built with Docker.

## Features

- ✅ User Registration & Authentication
- ✅ Product Catalog (15 items across 6 categories)
- ✅ Shopping Cart Management
- ✅ Order Placement & Checkout
- ✅ Order History
- ✅ Price Calculation
- ✅ Microservices Architecture

## Architecture

**4 Backend Microservices:**
- **Auth Service** (Port 5001) - User authentication
- **Grocery Service** (Port 5002) - Product management with MongoDB
- **Cart Service** (Port 5003) - Shopping cart operations
- **Order Service** (Port 5004) - Order processing

**Frontend:**
- **Frontend Service** (Port 8080) - Web interface with NGINX

## Quick Start

### Prerequisites
- Docker Desktop installed and running
- Ports 8080, 5001-5004, 27017 available

### Run Application

```powershell
# Start all services
docker-compose up -d

# View logs (optional)
docker-compose logs -f

# Stop all services
docker-compose down
```

### Access Application

Open your browser: **http://localhost:8080**

1. **Register** a new account
2. **Login** with your credentials
3. **Browse** 15 grocery products
4. **Add items** to cart
5. **Checkout** and view order history

## Project Structure

```
Shopping-Cart/
├── auth-service/          # Authentication microservice
├── cart-service/          # Shopping cart microservice
├── grocery-service/       # Product catalog microservice
├── order-service/         # Order processing microservice
├── frontend-service/      # Web frontend
└── docker-compose.yml     # Docker orchestration
```

## Technology Stack

- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Frontend:** HTML, CSS, JavaScript
- **Containerization:** Docker
- **Orchestration:** Docker Compose

## Default Products

15 items available:
- Fresh Vegetables, Fruits Bundle, Tomatoes, Potatoes
- Premium Rice, Basmati Rice, Whole Wheat Flour
- Organic Milk, Fresh Paneer, Curd
- Cooking Oil
- Premium Almonds, Cashew Nuts
- Tea Powder, Coffee Powder

---

**Smart Grocery Cart** - A modern microservices shopping platform
