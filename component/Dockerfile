#syntax=docker/dockerfile:1.4

# This Dockerfile uses the service folder as context.


# --
# Upstream images

FROM python:3.10-slim AS python_upstream
FROM node:20-slim AS node_upstream


# --
# Npm image

FROM node_upstream AS npm

# Create app directory
WORKDIR /app

# Source code should be mounted here
VOLUME /app

COPY --link --chmod=755 ./docker-npm-entrypoint.sh /usr/local/bin/docker-npm-entrypoint

ENTRYPOINT [ "docker-npm-entrypoint" ]
CMD [ "--help" ]


# --
# Python Base image

FROM python_upstream AS app_python_base

# Create app directory
WORKDIR /app

# Set exposed port
ARG PORT=80
ENV PORT=${PORT}

# Install Python dependencies
RUN pip install --no-cache-dir \
		streamlit \
		&& \
	# Clean up
	pip cache purge && \
	rm -rf /root/.cache/pip /tmp/* /var/tmp/*


# --
# Python Dev image

FROM app_python_base AS app_python_dev

ENV APP_ENV=dev
ENV NODE_ENV=development

# Install template as editable package
COPY --link ./app/setup.py ./app/README.md ./app/MANIFEST.in .
RUN pip install --no-cache-dir -e .

# Source code should be mounted here
VOLUME /app
VOLUME /app/node_modules

# Expose port
EXPOSE ${PORT}

CMD [ "sh", "-c", "streamlit run app.py --server.port ${PORT}" ]


# --
# Node Base image

FROM node_upstream AS app_node_base

# Create app directory
WORKDIR /app

# Set exposed port
ARG PORT=80
ENV PORT=${PORT}


# --
# Node Dev image

FROM app_node_base AS app_node_dev

ENV APP_ENV=dev
ENV NODE_ENV=development

# Install dev dependencies, required for build
COPY --link ./app/frontend/package*.json ./app/frontend/tsconfig*.json ./app/frontend/*.config.ts .
RUN npm clean-install --include=dev && \
	npm cache clean --force

# Source code should be mounted here
VOLUME /app
VOLUME /app/node_modules

# Expose port
EXPOSE ${PORT}

CMD [ "sh", "-c", "npm run dev -- --host --port ${PORT}" ]
