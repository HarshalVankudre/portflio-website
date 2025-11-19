# Use Node.js LTS as base image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Accept build arguments for environment variables
ARG NEXT_PUBLIC_GEMINI_API_KEY
ARG RESEND_API_KEY

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PUBLIC_GEMINI_API_KEY=${NEXT_PUBLIC_GEMINI_API_KEY}
ENV RESEND_API_KEY=${RESEND_API_KEY}

# Build the Next.js application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Accept runtime environment variables
ARG RESEND_API_KEY

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV RESEND_API_KEY=${RESEND_API_KEY}

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Cloud Run sets the PORT environment variable
ENV PORT 8080
EXPOSE 8080

# Important: Set hostname to 0.0.0.0 to bind to all interfaces
ENV HOSTNAME "0.0.0.0"

# Start the server
CMD ["node", "server.js"]
