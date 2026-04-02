## Builder Stage
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY pnpm-lock.yaml* package.json ./

# Install dependencies 
# Added --frozen-lockfile only if the lockfile exists
RUN pnpm install

# Copy source
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV=production

# This will now create the /app/out directory because of the config change above
RUN pnpm run build

# --------------------------------------------------------------------------- #

## Production Stage
FROM nginx:stable-alpine AS runner
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

# Copies the static export into Nginx
COPY --from=builder /app/out .

# Ensure you have an nginx.conf in your root directory!
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]