# Hotel Rating Microservices System

A professional, full-stack microservices-based Hotel Rating System built with Spring Boot, Spring Cloud, and React. This project demonstrates modern distributed system architecture, including service discovery, centralized configuration, API gateway, and polyglot persistence.

## 🏗️ Architecture Overiew

![Microservices Architecture](https://github.com/user-attachments/assets/your-arch-diagram-here)

The system consists of the following components:

- **Identity & Gateway**:
  - `Service Registry`: Eureka server for dynamic service discovery.
  - `Config Server`: Centralized configuration management using a Git/File-based backend.
  - `API Gateway`: Unified entry point for all client requests, handling routing and CORS.
- **Core Microservices**:
  - `User Service`: Manages user profiles and contact information (MySQL).
  - `Hotel Service`: Handles hotel metadata and availability (PostgreSQL).
  - `Rating Service`: Stores and processes hotel ratings and reviews (MongoDB).
- **Frontend**:
  - `React Dashboard`: Responsive Vite-based UI with glassmorphism design.

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Backend** | Java 17, Spring Boot 2.7.x, Spring Cloud (Eureka, Config Server, Gateway, OpenFeign) |
| **Databases** | MySQL 8.0, PostgreSQL 15, MongoDB |
| **Infrastructure** | Docker, Docker Compose |
| **API Documentation** | Swagger (Springdoc OpenAPI) |
| **Security** | Okta OAuth2 (Configurable) |
| **Frontend** | React, Vite, CSS Modules |

## 🚀 Getting Started

### Prerequisites

- **Java 17** (OpenJDK)
- **Maven 3.8+**
- **Docker & Docker Compose**
- **Node.js 18+**

### 1. Infrastructure Setup
Spin up all databases using Docker Compose:

```bash
docker compose down -v  # Clean wipe (optional)
docker compose up -d
```

> **Note**: Postgres is configured to run on port **5433** to avoid conflicts with native local installations.

### 2. Backend Launch Sequence
Start the services in the following order (allow ~10s between each):

1. **Service Registry** (Port 8761)
2. **Config Server** (Port 8085)
3. **User Service** (Port 8081)
4. **Hotel Service** (Port 8082)
5. **Rating Service** (Port 8083)
6. **API Gateway** (Port 8084)

Run each service using:
```bash
./mvnw spring-boot:run
```

### 3. Frontend Setup
```bash
cd HotelRatingFrontend
npm install
npm run dev
```
Visit the UI at [http://localhost:5173](http://localhost:5173).

## 📖 API Documentation (Swagger)

All services are documented using Swagger UI. Once running, visit:

- **User Service API**: [http://localhost:8081/swagger-ui.html](http://localhost:8081/swagger-ui.html)
- **Hotel Service API**: [http://localhost:8082/swagger-ui.html](http://localhost:8082/swagger-ui.html)
- **Eureka Dashboard**: [http://localhost:8761](http://localhost:8761)

## 🔧 Deployment Configuration

- **CORS**: Configured in `API-GATEWAY` to allow traffic from `localhost:5173`.
- **Database Connection**: Credentials and URLs are centrally managed in `ConfigServer` or individual `application.yml` files.
- **Port Mapping**:
  - MySQL: 3307
  - PostgreSQL: 5433
  - MongoDB: 27017

## 🛠️ Key Technical Challenges Resolved

- **Lombok/Java 25 Conflict**: Downgraded to Java 17 and added explicit Maven compiler plugins for stable builds.
- **DB Conflict**: Resolved role/connection failures by switching to a dedicated Postgres port (5433) and using Alpine-based images.
- **CORS Blocking**: Implemented global Gateway CORS policies to enable Frontend-Backend communication.

---

Developed with ❤️ as a Microservices Learning Path.
