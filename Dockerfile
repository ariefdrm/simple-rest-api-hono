FROM oven/bun:alpine

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile  # Ensures reproducible installs

COPY . .

EXPOSE 3000

CMD ["bun", "start"]
