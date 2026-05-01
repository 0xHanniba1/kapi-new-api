# Kapi Deployment Notes

## Important VPS Constraint

The production VPS has limited memory. Do not run a full repository Docker build on the server:

```bash
docker build -t kapi-new-api:kapi-ui .
```

That build performs frontend and Go compilation on the VPS. It previously pushed the server into a near-unresponsive state: SSH connected at the TCP level but timed out during banner exchange, and the site stopped responding until the server recovered/restarted.

Use this deployment pattern instead:

1. Build both frontend bundles locally.
2. Cross-compile the Linux `amd64` backend locally.
3. Upload only the lightweight runtime package to the VPS.
4. Let the VPS build a small runtime image and restart `new-api`.

## Local Build

Run from the repository root:

```bash
cd web/default
bun run build

cd ../classic
bun install --frozen-lockfile
VITE_REACT_APP_VERSION=$(cat ../../VERSION) bun run build

cd ../..
rm -rf /tmp/kapi-runtime /tmp/kapi-runtime.tar.gz
mkdir -p /tmp/kapi-runtime

VERSION_VALUE="kapi-ui-$(git rev-parse --short HEAD)"
GOOS=linux GOARCH=amd64 CGO_ENABLED=0 GOEXPERIMENT=greenteagc \
  go build -ldflags "-s -w -X 'github.com/QuantumNous/new-api/common.Version=${VERSION_VALUE}'" \
  -o /tmp/kapi-runtime/new-api
```

Create `/tmp/kapi-runtime/Dockerfile`:

```Dockerfile
FROM debian:bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates tzdata wget \
  && rm -rf /var/lib/apt/lists/* \
  && update-ca-certificates

COPY new-api /new-api

EXPOSE 3000
WORKDIR /data
ENTRYPOINT ["/new-api"]
```

Package it:

```bash
tar --no-xattrs -czf /tmp/kapi-runtime.tar.gz -C /tmp/kapi-runtime .
```

## Server Deploy

Upload the runtime package, then on the server:

```bash
cd /opt/new-api
STAMP=$(date +%Y%m%d-%H%M%S)
cp docker-compose.yml docker-compose.yml.bak-$STAMP

rm -rf runtime
mkdir -p runtime
tar -xzf kapi-runtime.tar.gz -C runtime

docker build -t kapi-new-api:kapi-ui-runtime runtime
```

Make sure `docker-compose.yml` uses the local runtime image:

```yaml
services:
  new-api:
    image: kapi-new-api:kapi-ui-runtime
```

Restart only the app container:

```bash
docker-compose up -d new-api
```

## Verify

```bash
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}"
docker logs --tail=80 new-api
curl -I https://api.kunapi.com
curl -s https://api.kunapi.com/api/status
```

Expected markers:

- `new-api` uses `kapi-new-api:kapi-ui-runtime`
- `https://api.kunapi.com` returns `HTTP 200`
- `/api/status` includes `"success":true`
- `x-new-api-version` matches the current `kapi-ui-<commit>` version

