FROM rust:1.89 as builder
WORKDIR /build
COPY . .
RUN cargo build --release

FROM scratch
COPY --from=builder /build/target/release/libshade_contract.rlib /
