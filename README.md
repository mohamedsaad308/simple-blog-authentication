# Blog Application

This is a multi-service blog application built using Docker. It consists of the following services:

- MySQL Database
- API Service
- Celery Worker
- Redis
- Frontend
- SMTP4Dev

## Prerequisites

Ensure you have the following installed:

- Docker
- Docker Compose

## Project Structure

- `backend/` - Contains the backend API service and Celery worker.
- `client/` - Contains the frontend React application.
- `.env` - Environment file containing configuration variables.

## Services

### MySQL Database (`db`)

- **Image**: `mysql:8.0`
- **Ports**: `3306:3306`
- **Volumes**: `mysqldata:/var/lib/mysql`
- **Environment File**: `.env`

### API Service (`api`)

- **Platform**: `linux/amd64`
- **Build Context**: `./backend`
- **Ports**: `8000:8000`
- **Depends On**: `db`, `redis`
- **Restart Policy**: `on-failure`
- **Volumes**:
  - `./backend:/home/blog`
  - `./backend/storage:/storage`
- **Environment File**: `.env`

### Celery Worker (`celeryworker`)

- **Inherits from**: `api`
- **Ports**: None
- **Command**: `bash -c "poetry run celery -A blog worker -l info"`
- **Depends On**: `api`
- **Volumes**: `./backend:/app`
- **Environment**: `CELERY=true`

### Redis (`redis`)

- **Image**: `redis:6.2-alpine`

### Frontend (`frontend`)

- **Build Context**: `client`
- **Restart Policy**: `unless-stopped`
- **Volumes**: `./client:/app`
- **Ports**: `3000:3000`
- **Command**: `bash -c "cp -rfu /cache/node_modules/. /app/node_modules/ && yarn start"`
- **Environment File**: `.env`

### SMTP4Dev (`smtp4dev`)

- **Image**: `rnwood/smtp4dev:linux-amd64-3.6.0-ci20240506101`
- **Ports**:
  - `5000:80`
  - `25:25`
- **Restart Policy**: `always`

## Volumes

- `mysqldata`
- `pgdata`
- `redisdata`

## Getting Started

1. **Clone the repo then build images and run containers**

   ```bash
   git clone https://github.com/mohamedsaad308/simple-blog-authentication
   cd simple-blog-authentication
   docker-compose up --build`
   ```

## To add a new backend dependency

Run:

```bash
docker-compose run --rm api poetry add --lock <dependency_name>
```

or if it's a dev dependency, run:

```bash
docker-compose run --rm api poetry add --dev --lock <dependency_name>
```

> NOTE: After adding a new dependency, you need to rebuild the containers: `docker-compose up --build`

## To add a new frontend dependency

Make sure the project is running (step 2) and then run:

```bash
docker-compose exec frontend yarn add <dependency_name>
```

or if it's a dev dependency, run:

```bash
docker-compose exec frontend yarn add --dev <dependency_name>
```

---

```bash
docker-compose exec frontend yarn add --dev react-query-devtools
```
