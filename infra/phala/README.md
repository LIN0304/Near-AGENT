# Phala Cloud

Guidance and configuration for deploying agents to Phala Cloud TEE environments.

## Environment variables

- `PHALA_API_KEY` – access to Phala Cloud
- `AGENT_ACCOUNT` – NEAR account controlling the agent
- `IMAGE_DIGEST` – container image digest used for attestation

## Deployment

Use `docker-compose.yaml` and reference images by digest:

```
services:
  agent:
    image: my-registry/agent@sha256:abcdef...
    environment:
      PHALA_API_KEY: ${PHALA_API_KEY}
```

To upgrade, update the digest and redeploy. Keep previous digests to allow rollback if issues arise.
