# Stage 1
FROM node:18.16-alpine AS builder
RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build



# Stage 2
FROM nginx:1.25-alpine

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
