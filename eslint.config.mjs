import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// DDD dependency rule — see docs/architecture.md.
const layer = (name) => ({ group: [`@/${name}`, `@/${name}/**`], message: `Layer boundary: see docs/architecture.md.` });
const restrict = (files, groups) => ({
  files,
  rules: { "no-restricted-imports": ["error", { patterns: groups }] },
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  restrict(["domain/**"], [
    layer("application"),
    layer("infrastructure"),
    layer("presentation"),
    layer("di"),
    layer("generated"),
    layer("app"),
    { group: ["next", "next/**", "zod", "@prisma/*", "react"], message: "The domain layer must stay framework-free." },
  ]),
  restrict(["application/**"], [
    layer("infrastructure"),
    layer("presentation"),
    layer("di"),
    layer("generated"),
    layer("app"),
    { group: ["next", "next/**", "@prisma/*"], message: "The application layer must not depend on frameworks or persistence." },
  ]),
  restrict(["infrastructure/**"], [layer("application"), layer("presentation"), layer("di"), layer("app")]),
  restrict(["presentation/**"], [
    layer("infrastructure"),
    layer("di"),
    layer("generated"),
    layer("app"),
  ]),
  restrict(["app/**", "components/**"], [
    layer("infrastructure"),
    layer("generated"),
    { group: ["@/domain/*/repositories/**"], message: "Go through a service from @/di/container." },
  ]),
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Vendored Cojeev registry code (not authored here).
    "lib/cojeev/**",
    "lib/cojeev-motion/**",
  ]),
]);

export default eslintConfig;
