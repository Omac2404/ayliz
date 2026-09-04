# =========================================================================
#  Ayliz Lojistik - statik site imaji (EasyPanel uyumlu)
#  1) Node ile dist/ uretilir  2) Nginx ile servis edilir
# =========================================================================

# ---------- 1. asama: build ----------
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
COPY build.mjs ./
COPY src ./src
RUN node build.mjs

# ---------- 2. asama: runtime ----------
FROM nginx:1.27-alpine
LABEL org.opencontainers.image.title="Ayliz Lojistik" \
      org.opencontainers.image.description="Ayliz Lojistik kurumsal web sitesi" \
      org.opencontainers.image.licenses="UNLICENSED"

RUN rm -rf /usr/share/nginx/html/*
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
