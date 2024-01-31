FROM python:3.9-slim-buster as build-base

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1 \
    PYSETUP_PATH="/opt/pysetup" \
    VENV_PATH="/opt/pysetup/.venv" \
    POETRY_VERSION=1.2.2

RUN apt-get update \
    && apt-get install python3-dev default-libmysqlclient-dev build-essential pkg-config -y \
    && rm -rf /var/lib/apt/lists/*

RUN pip install poetry==1.7.1

ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"

# Separate docker stage to avoid re-installing poetry & build essentials on every change
FROM build-base as final-stage

WORKDIR $PYSETUP_PATH

COPY poetry.lock ./

COPY pyproject.toml ./

RUN poetry run pip install --upgrade pip

RUN poetry install --no-root --only main --sync

WORKDIR /home/blog

COPY ./ ./

COPY entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]

EXPOSE 8000