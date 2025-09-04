# Shade Agent Contract

This Rust crate provides a placeholder for a custom NEAR contract that can be
used to validate TEE attestation and control access to `request_signature`.
The current implementation is minimal and meant to be replaced with production
logic.

## Building

```
cargo build --target wasm32-unknown-unknown --release
```

## Testing

```
cargo test
```
