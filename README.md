# Near Shade Agent Project

This repository provides a minimal scaffolding for building and deploying
[NEAR Shade Agents](https://docs.near.org/ai/shade-agents) using a modern
DevOps workflow. It follows the architecture outlined in the NEAR documentation
and is organized as a monorepo.

## Structure

```
agent/      - Web worker exposing REST APIs and interacting with the agent contract.
contracts/  - Rust contract controlling access to `request_signature`.
infra/      - Infrastructure as code, deployment scripts and policies.
.github/    - CI/CD workflows for testing and deployment.
```

Each directory contains README files with additional details. The project is a
starting point and intentionally minimal — replace placeholders with production
logic, tests and security controls before deploying to a TEE environment.
