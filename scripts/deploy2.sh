#!/bin/bash

deploy_init() {
    local phase=${1:-production}

    export NODE_ENV=${NODE_ENV:-$phase}
    export FLASK_ENV=${FLASK_ENV:-$phase}

    local path=${CALC_PATH:-"/mnt/g/.dev/projects/current/calc"}

    if ! cd "$path"; then
        echo "Error: Invalid directory."
        return 1
    fi
}

deploy_frontend() {
    cd frontend
    npm install
    npm run build
    cd ..
}

deploy_python() {
    cd backend/api
    source venv/bin/activate
    pip install -r requirements.txt
    pkill gunicorn
    gunicorn -w 4 -b 0.0.0.0:8000 calculate:app --daemon
    cd ..
}

deploy_node() {
    cd server
    pkill node
    node server.js &
    cd .. && cd ..
}

# will be used later on but not now
deploy_nginx() {
    local dns=${public_url}
}

clear
echo "Deploying..."
deploy_init "$1"
deploy_frontend
deploy_python
deploy_node
echo
echo "Deployment operation completed. Listening at http://localhost:3000"
