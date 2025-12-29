#!/bin/bash

# Setup SSL Certificate with Let's Encrypt
# Usage: ./setup-ssl.sh yourdomain.com your@email.com

DOMAIN=$1
EMAIL=$2

if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
    echo "Usage: ./setup-ssl.sh yourdomain.com your@email.com"
    exit 1
fi

echo "Setting up SSL for domain: $DOMAIN"

# Create directories
mkdir -p certbot/conf
mkdir -p certbot/www

# Stop nginx if running
docker compose -f docker-compose.prod.yml down nginx

# Create temporary nginx config for certificate generation
cat > nginx/nginx-temp.conf << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 200 'OK';
        add_header Content-Type text/plain;
    }
}
EOF

# Backup original nginx.conf
cp nginx/nginx.conf nginx/nginx.conf.bak
mv nginx/nginx-temp.conf nginx/nginx.conf

# Start nginx with temporary config
docker compose -f docker-compose.prod.yml up -d nginx

# Wait for nginx to start
sleep 5

# Get SSL certificate
docker compose -f docker-compose.prod.yml run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    -d $DOMAIN \
    -d www.$DOMAIN

# Restore original nginx config and replace domain
cp nginx/nginx.conf.bak nginx/nginx.conf
sed -i "s/YOUR_DOMAIN.com/$DOMAIN/g" nginx/nginx.conf

# Restart with SSL config
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d

echo "SSL setup complete! Your site should be accessible at https://$DOMAIN"
