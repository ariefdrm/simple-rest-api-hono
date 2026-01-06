FROM oven/bun:alpine as base
WORKDIR /usr/src/app

# Gunakan wildcard agar fleksibel dengan bun.lock atau bun.lock
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Copy konfigurasi TS agar alias terbaca saat build/generate
COPY tsconfig.json ./
COPY ./prisma ./prisma
RUN bunx prisma generate 

COPY . .

EXPOSE 3000
ENTRYPOINT [ "bun", "start" ]
