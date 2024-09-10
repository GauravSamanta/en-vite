
ARG NODE_VERSION=20.9.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production
ENV DATABASE_URL="postgresql://postgres:postgres@db:5432/prod"

WORKDIR /app

COPY package*.json ./

RUN npm i
# Copy the rest of the source files into the image.
COPY . .


# Expose the port that the application listens on.
EXPOSE 8000

# Run the application.
CMD npm run dev
