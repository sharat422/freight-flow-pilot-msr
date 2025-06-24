
#!/bin/bash

# MSR Freight Dispatchers Production Deployment Script

set -e

echo "🚀 Starting MSR Freight Dispatchers deployment..."

# Check if required environment variables are set
if [ -z "$EMAIL_HOST" ] || [ -z "$EMAIL_USER" ] || [ -z "$EMAIL_PASS" ]; then
    echo "❌ Error: Missing required environment variables (EMAIL_HOST, EMAIL_USER, EMAIL_PASS)"
    exit 1
fi

# Build and start services
echo "🔨 Building services..."
docker-compose build --no-cache

echo "🔧 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if backend is healthy
echo "🏥 Checking backend health..."
if curl -f http://localhost:5000/api/health; then
    echo "✅ Backend is healthy"
else
    echo "❌ Backend health check failed"
    docker-compose logs backend
    exit 1
fi

# Check if MongoDB is ready
echo "🗄️ Checking MongoDB..."
if docker-compose exec -T mongo mongosh --eval "db.adminCommand('ping')" messageDB; then
    echo "✅ MongoDB is ready"
else
    echo "❌ MongoDB is not ready"
    docker-compose logs mongo
    exit 1
fi

echo "🎉 Deployment completed successfully!"
echo "📊 Service status:"
docker-compose ps

echo ""
echo "🔗 Access your application:"
echo "   Frontend: https://msrfreight.com"
echo "   API Health: https://msrfreight.com/health"
echo ""
echo "📋 To monitor logs:"
echo "   docker-compose logs -f backend"
echo "   docker-compose logs -f mongo"
echo "   docker-compose logs -f nginx"
