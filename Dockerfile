FROM node AS builder
RUN npm install -g typescript
# Set working directory.
WORKDIR /usr/app
# Copy package.json and package-lock.json for frontend and backend and install dependencies, before copying the rest. This is more efficient as only changes to these files require a new npm install.
COPY package*.json ./
RUN npm install
COPY server/package*.json ./server/
RUN cd server && npm install
# Copy app source.
COPY public ./public/
COPY src ./src/
COPY common ./common/
# Copy compilation config files.
COPY .eslintrc.js babel.config.js tsconfig.json ./
# Copy server src.
COPY server ./server/
# Store git commit and ref.
ARG git_sha
ARG git_ref
RUN echo "VUE_APP_GIT_SHA=$git_sha" > ./.env
RUN echo "VUE_APP_GIT_REF=$git_ref" >> ./.env
# Build everything.
RUN npm run build

FROM node:16-alpine
# Set working directory.
WORKDIR /usr/app
# Copy package.json and package-lock.json for backend and install production dependencies.
COPY server/package*.json ./server/
RUN cd server && npm install --only=prod

COPY --from=builder /usr/app/dist dist
COPY --from=builder /usr/app/server/dist server/dist
COPY --from=builder /usr/app/.env ./

# Add group and user
RUN addgroup -S webserver -g 1081 && adduser -S webserver -G webserver -u 1081
USER webserver

EXPOSE 3080
WORKDIR ./server
CMD ["node", "dist/server/src/server.js"]