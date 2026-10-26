# ci-cd-demo

A minimal TypeScript + Express API, built as a practice project for learning CI/CD.

## Endpoints

| Method | Path       | Response                                              |
| ------ | ---------- | ----------------------------------------------------- |
| GET    | `/health`  | `{"status":"ok","uptime":<seconds>,"startedAt":"…"}`  |
| GET    | `/hello`   | `{"message":"Hello, World!"}`                         |

## Layout

```
src/
  app.ts      # createApp() — Express app factory, no port binding (testable)
  routes.ts   # the two route handlers
  server.ts   # entrypoint: createApp().listen(PORT)
tests/
  health.test.ts
  hello.test.ts
jest.config.js
tsconfig.json        # typechecks src + tests
tsconfig.build.json  # emits dist/ from src only
```

`app.ts` is deliberately separated from `server.ts`: tests import the app and drive it
in-process with supertest, so no real socket is opened during CI.

## Commands

```bash
npm run dev        # ts-node-dev with reload on http://localhost:3000
npm run typecheck  # tsc --noEmit (src + tests)
npm test           # jest
npm run test:coverage
npm run build      # tsc -> dist/
npm start          # node dist/server.js
```

All four CI-style gates pass locally: `typecheck`, `test`, `build`, and the smoke test
against the built server.

## Next step for CI/CD

Since the repo has no remote yet, the natural follow-up is to init git, push to GitHub,
and add `.github/workflows/ci.yml` running `npm ci && npm run typecheck && npm test &&
npm run build` on a matrix of Node versions.
