## Builder Stage
FROM node:20-alpine AS builder

# lib6-compat needed
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy lockfile and package.json first for better layer caching
COPY pnpm-lock.yaml package.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code (including tsconfig.json)
COPY . .

# Set environment to production and disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV=production

# Run the build (This triggers 'next build' which uses TypeScript compiler)
RUN pnpm run build

# --------------------------------------------------------------------------- #

## Production Stage
FROM nginx:stable-alpine AS runner
WORKDIR /usr/share/nginx/html

# Clean default nginx files
RUN rm -rf ./*

# Copy the 'out' directory created by Next.js static export
COPY --from=builder /app/out .

# Copy your custom nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]