# Production-ready Tilt deployment
# Prefer a dedicated production compose file when present.
# Use .env.prod or shell environment values for production secrets and config.
compose_file = 'docker-compose.prod.yml' if os.path.exists('docker-compose.prod.yml') else 'docker-compose.yml'

docker_compose(compose_file)

# Production service access:
# api-gateway: http://localhost:8080
# frontend: http://localhost:3000
