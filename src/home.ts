/**
 * Landing page served at `/`. Kept as a TS module (not a .html file) so
 * `tsc` emits it into dist/ without an extra copy step.
 */
export const HOME_HTML = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>CI/CD Learnings</title>
  <style>
    :root {
      --bg: #f7f7f5;
      --surface: #ffffff;
      --text: #1d1d1b;
      --muted: #5f5f5a;
      --border: #e2e2dc;
      --accent: #2f6f4f;
      --code-bg: #f0f0ec;
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #161615;
        --surface: #1f1f1d;
        --text: #ececea;
        --muted: #a3a39d;
        --border: #34342f;
        --accent: #6fbf94;
        --code-bg: #2a2a27;
      }
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font: 16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif;
    }
    main { max-width: 760px; margin: 0 auto; padding: 48px 16px 64px; }
    h1 { font-size: 2rem; line-height: 1.2; margin: 0 0 8px; }
    h2 { font-size: 1.25rem; margin: 40px 0 12px; }
    p.lede { color: var(--muted); margin: 0 0 32px; }
    section {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 4px 24px 20px;
      margin-bottom: 20px;
    }
    ol, ul { padding-left: 20px; }
    li { margin: 6px 0; }
    code {
      font: 0.9em ui-monospace, SFMono-Regular, Menlo, monospace;
      background: var(--code-bg);
      padding: 1px 5px;
      border-radius: 4px;
    }
    pre {
      background: var(--code-bg);
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      font: 13px/1.5 ui-monospace, SFMono-Regular, Menlo, monospace;
    }
    pre code { background: none; padding: 0; }
    strong { color: var(--accent); }
    footer { color: var(--muted); font-size: 0.875rem; margin-top: 40px; }
    a { color: var(--accent); }
  </style>
</head>
<body>
  <main>
    <h1>CI/CD Workflow Learnings</h1>
    <p class="lede">Notes from wiring up GitHub Actions for a small TypeScript + Express API.</p>

    <section>
      <h2>What CI/CD means here</h2>
      <ul>
        <li><strong>Continuous Integration</strong>: every push and pull request is automatically type-checked, tested and built.</li>
        <li><strong>Continuous Delivery</strong>: once CI is green, the build is ready to ship. Deployment is the next step to add.</li>
      </ul>
    </section>

    <section>
      <h2>Anatomy of a GitHub Actions workflow</h2>
      <ul>
        <li><strong>Workflow</strong>: a YAML file in <code>.github/workflows/</code>.</li>
        <li><strong>Events</strong> (<code>on:</code>): what triggers it, such as <code>push</code> or <code>pull_request</code>.</li>
        <li><strong>Jobs</strong>: units of work, each on a fresh runner such as <code>ubuntu-latest</code>.</li>
        <li><strong>Steps</strong>: run in order; use a prebuilt action (<code>uses:</code>) or a shell command (<code>run:</code>).</li>
        <li>Any step that exits non-zero fails the job, and a failed check blocks the PR.</li>
      </ul>
    </section>

    <section>
      <h2>This project's workflow</h2>
<pre><code>name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run verify</code></pre>
      <p><code>npm run verify</code> chains <code>typecheck</code>, <code>test</code> and <code>build</code>, so CI runs exactly what you run locally.</p>
    </section>

    <section>
      <h2>Lessons learned</h2>
      <ol>
        <li>Use <code>npm ci</code>, not <code>npm install</code>: it installs exactly what the lockfile says and fails if the lockfile is out of sync.</li>
        <li>Keep one script, like <code>verify</code>, as the single source of truth for local checks and CI.</li>
        <li>Cache dependencies with <code>setup-node</code>'s <code>cache: npm</code> to speed up runs.</li>
        <li>Grant least privilege with <code>permissions: contents: read</code>.</li>
        <li>Use <code>concurrency</code> with <code>cancel-in-progress</code> so new pushes cancel stale runs.</li>
        <li>Set <code>timeout-minutes</code> so a hung job can't burn runner minutes.</li>
        <li>Work on feature branches and merge through PRs so every change passes CI before it reaches <code>main</code>.</li>
        <li>Job and workflow names appear in the PR checks list (for example "CI / Verify"), so pick clear ones.</li>
      </ol>
    </section>

    <section>
      <h2>Next steps</h2>
      <ul>
        <li>Require the CI check to pass with branch protection on <code>main</code>.</li>
        <li>Add linting and coverage thresholds to <code>verify</code>.</li>
        <li>Add a deploy job that runs only on <code>main</code> after <code>verify</code> passes.</li>
      </ul>
    </section>

    <footer>API endpoints: <a href="/api/health">/api/health</a> &middot; <a href="/api/hello">/api/hello</a></footer>
  </main>
</body>
</html>
`;
