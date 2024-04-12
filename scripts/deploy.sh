#!/bin/bash

deploy_init() {
    export phase=production

    export NODE_ENV=$phase
    export FLASK_ENV=$phase

    export app="/mnt/g/.dev/projects/current/calc"

    cd "$app"
    return 0
}

deploy_frontend() {
    echo "Deploying Frontend..."
    cd frontend || exit 1
    npm install || exit 1
    export PATH="$PATH:./node_modules/.bin"
    vite build || exit 1
    cd .. || exit 1
    return 0
}

deploy_python() {
    echo "Deploying Python backend..."
    cd backend/api || exit 1
    source venv/bin/activate
    pip install -r requirements.txt || exit 1
    pkill gunicorn
    gunicorn -w 4 -b 0.0.0.0:8000 calculate:app --daemon || exit 1
    cd ../.. || exit 1
    return 0
}

deploy_node() {
    echo "Deploying Node.js server..."
    cd server || exit 1
    pkill node
    node server.js &
    cd .. || exit 1
    return 0
}

#  deploy_nginx() {
 #     echo "Deploying Nginx configuration..."
 #     local dns=${public_url:-"example.com"}
#   }

echo "Starting deployment..."
deploy_init
deploy_frontend
deploy_python
deploy_node
echo "Deployment completed successfully. App is live at http://localhost:3000"
