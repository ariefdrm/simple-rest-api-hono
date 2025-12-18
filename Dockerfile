FROM oven/bun:alpine

WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile  # Still good for image consistency

# Generate Prisma Client saat build
COPY prisma ./prisma
RUN bunx prisma generate

COPY . .

COPY docker-entrypoint.sh ./

RUN chmod +x ./docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]

CMD ["bun", "start"]
