# PlayARR API

This monorepo contains a NestJS API and an Angular UI.

## Running the API

Install dependencies and build:

```bash
npm install --legacy-peer-deps
npx tsc -p apps/playarr-api/tsconfig.json
```

Start the server:

```bash
node dist/out-tsc/apps/playarr-api/src/main.js
```

The API will be available on `http://localhost:3000`.

