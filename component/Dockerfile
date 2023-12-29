#syntax=docker/dockerfile:1.4

# This Dockerfile uses the service parent folder as context.


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
# Node Base image

FROM node_upstream AS app_node_base

# Create app directory
WORKDIR /app

# Set exposed port
ARG PORT=80
ENV PORT=${PORT}

# Install dev dependencies, required in dev & build
COPY --link ./frontend/package*.json ./frontend/tsconfig*.json ./frontend/*.config.* .
RUN npm clean-install --include=dev && \
	npm cache clean --force


# --
# Node Dev image

FROM app_node_base AS app_node_dev

ENV APP_ENV=dev
ENV NODE_ENV=development

# Source code should be mounted here
VOLUME /app
VOLUME /app/node_modules

# Expose port
EXPOSE ${PORT}

COPY --link --chmod=755 ./docker-dev-command.sh /usr/local/bin/docker-dev-command

CMD [ "docker-dev-command" ]


# --
# Node Prod build image

FROM app_node_base AS app_node_prod_build

ENV APP_ENV=prod
ENV NODE_ENV=production

# Copy source code
COPY --link ./frontend .

# Create symlink to streamlit component library
# Workaround for "Unexpected token 'export'" error
RUN ln -s /app/node_modules/streamlit-component-lib/dist ./src/stcomponentlib

# Build application
RUN npm run build


# --
# Node Prod image

FROM nginx_upstream AS app_node_prod

ENV APP_ENV=prod
ENV NODE_ENV=production

# Set app directory
WORKDIR /usr/share/nginx/html

# Copy built static website files
COPY --from=app_node_prod_build --link /app/dist .


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
# Python Prod image

FROM app_python_base AS app_python_prod

ENV APP_ENV=prod

# Create user 'user' and group 'app'
RUN groupadd -r app && \
	useradd -lr -G app -d /app user && \
	chown -R user:app /app
USER user

# Copy source code
COPY --link ./app .

# Copy built frontend files
COPY --from=app_node_prod_build --link /app/dist ./frontend/build

# Edit frontend files
USER root
RUN \
	for component in $(find ./frontend/build -mindepth 1 -type d ! -name '_astro'); do \
		# Copy astro assets for each component
		# Symlinks do not work: requests are forbidden
		mkdir -p ${component}/_astro; \
		cp -r ./frontend/build/_astro/* ${component}/_astro; \
		# Remove leading slash to load astro assets
		sed -i 's#/_astro#/component/__init__.'"${component##*/}/_astro"'#g' ${component}/index.html; \
	done
USER user

# Expose port
EXPOSE ${PORT}

CMD [ "sh", "-c", "streamlit run app.py --server.port ${PORT}" ]


# --
# Python CI/CD image

FROM app_python_prod AS app_python_cicd

CMD [ "sh" ]
