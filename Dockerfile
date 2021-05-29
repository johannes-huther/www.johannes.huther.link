FROM node
RUN npm install -g typescript
# Set working directory.
WORKDIR /usr/app
# Copy package.json and package-lock.json for frontend, backend and proxy and install dependencies, before copying the rest. This is more efficient as only changes to these files require a new npm install.
COPY package*.json ./
RUN npm install
COPY server/package*.json ./server/
RUN cd server && npm install
# Copy app source.
COPY public ./public/
COPY src ./src/
# Copy compilation config files.
COPY .eslintrc.js babel.config.js tsconfig.json ./
# Copy server src.
COPY server ./server/
# Build everything.
RUN npm run build

# Store git commit and ref.
RUN mkdir data
ARG git_sha
ARG git_ref
RUN echo $git_sha > data/git_sha.txt
RUN echo $git_ref > data/git_ref.txt

# Add group and user
RUN addgroup --system webserver --gid 1081 && useradd --system -g webserver webserver --uid 1081
USER webserver

EXPOSE 3080
CMD ["npm", "run", "start"]