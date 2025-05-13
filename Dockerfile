FROM python:3.13-slim-bookworm AS builder
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Change the working directory to the `app` directory
WORKDIR /app

# Install dependencies
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-project --no-editable --no-dev --group prod

# Copy the project into the intermediate image
ADD ./lewa /app

FROM python:3.13-slim-bookworm

# Copy the environment, but not the source code
COPY --from=builder --chown=app:app /app /app

WORKDIR /app

# entrypoint, must be executable file chmod +x entrypoint.sh
COPY entrypoint.sh .

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PATH="/app/.venv/bin:$PATH"

# Expose port 8000
EXPOSE 8000

# Run the application
ENTRYPOINT ["./entrypoint.sh"]
