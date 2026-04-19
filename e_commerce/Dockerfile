# =========================
# BUILD STAGE
# =========================
FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim AS python-build-stage

ENV UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy \
    UV_PYTHON_DOWNLOADS=0

ARG APP_HOME=/app
WORKDIR ${APP_HOME}

# Install build dependencies
RUN apt-get update && apt-get install --no-install-recommends -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies (cached)
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --locked --no-install-project --no-dev

# Copy project files
COPY . ${APP_HOME}

# Install project
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --locked --no-dev


# =========================
# RUNTIME STAGE
# =========================
FROM python:3.12-slim-bookworm AS python-run-stage

ARG APP_HOME=/app
WORKDIR ${APP_HOME}

# Create non-root user
RUN addgroup --system django \
    && adduser --system --ingroup django django

# Install runtime dependencies only
RUN apt-get update && apt-get install --no-install-recommends -y \
    libpq5 \
    gettext \
    wait-for-it \
    && rm -rf /var/lib/apt/lists/*

# Copy entrypoint and scripts
COPY --chown=django:django ./compose/production/django/entrypoint /entrypoint
COPY --chown=django:django ./compose/production/django/start /start
COPY --chown=django:django ./compose/production/django/release /release
COPY --chown=django:django ./compose/production/django/celery/worker/start /start-celeryworker
COPY --chown=django:django ./compose/production/django/celery/beat/start /start-celerybeat
COPY --chown=django:django ./compose/production/django/celery/flower/start /start-flower

# Fix line endings & permissions
RUN sed -i 's/\r$//g' /entrypoint /start /release /start-celeryworker /start-celerybeat /start-flower \
    && chmod +x /entrypoint /start /release /start-celeryworker /start-celerybeat /start-flower

# Copy app from build stage
COPY --from=python-build-stage --chown=django:django ${APP_HOME} ${APP_HOME}

# Ensure proper permissions
RUN mkdir -p ${APP_HOME}/e_commerce/media \
    && chown -R django:django ${APP_HOME}

# Activate virtual environment
ENV PATH="/app/.venv/bin:$PATH"
ENV PYTHONPATH="/app"

USER django

# Compile translations (no DB dependency)
RUN DATABASE_URL="postgres://localhost:5432/db" \
    DJANGO_SETTINGS_MODULE=config.settings.production \
    python manage.py compilemessages

# Entrypoint + default command
ENTRYPOINT ["/entrypoint"]
CMD ["/start"]