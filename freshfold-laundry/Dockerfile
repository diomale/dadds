# FreshFold Laundry — static site image
FROM nginx:1.27-alpine

COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY assets/images/ /usr/share/nginx/html/assets/images/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
