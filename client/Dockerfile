# Build the React application
FROM node:16-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

# Serve the React application using Nginx
FROM nginx:stable-alpine

# Copy the build output to Nginx server directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy additional static files (ex: fonts)
# COPY --from=build /app/public/fonts /usr/share/nginx/html/fonts

# Copy the Nginx configuration file, otherwise, the default will be used
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]