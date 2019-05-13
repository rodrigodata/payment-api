# Tecnologias
Node.js, Express, MongoDB, Docker, Docker Compose


# Tests

// Testes da API
docker-compose -p payment_api_tests run -p 3006 --rm payment npm run tests:api

// Testes de integração
docker-compose -p payment_api_tests run -p 3007 --rm payment npm run tests:integration

// Testes unitarios
docker-compose -p payment_api_tests run -p 3008 --rm payment npm run tests:unit