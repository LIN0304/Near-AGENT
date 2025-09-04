# Shade Agent Worker

This directory hosts the web worker responsible for handling API requests and
interacting with the Shade Agent contract. It is designed for deployment in a
TEE environment and includes placeholders for configuration, tests and
containerization.

- `pages/api/` – REST endpoints such as `/api/agent-account`.
- `src/` – core business logic and chain adapters.
- `config/` – runtime configuration and allowlists.
- `tests/` – unit and integration tests.

The provided `Dockerfile` and `docker-compose.yaml` are minimal examples and
should be extended to suit production needs.
