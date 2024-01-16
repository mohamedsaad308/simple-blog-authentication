FROM python:3.9-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN apt-get update \
    && apt-get install python3-dev default-libmysqlclient-dev build-essential pkg-config -y \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/

RUN pip install --upgrade pip \
    && pip install -r requirements.txt

COPY . /app/

EXPOSE 8000

# Apply database migrations and start the server
# CMD ["sh", "./backend/docker-entrypoint.sh"]
