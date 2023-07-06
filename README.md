## Deployment
- PostgreSQL in docker, using image postgres:12 (docker-compose.yml)

- In order to start the app locally (for the first time):
```bash
# Create .env file

$ yarn start:docker

$ yarn init:sql

$ yarn dev
```

- In order to start app locally (after the first time):
```bash
$ yarn start:docker

$ yarn dev
```