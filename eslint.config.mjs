import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    prettier,

    globalIgnores([
        "node_modules/**",
        ".next/**",
        "out/**",
        "build/**",
        "dist/**",
        "coverage/**",
        "next-env.d.ts"
    ]),

    {
        rules: {
            "no-console": "warn",
            "@typescript-eslint/no-unused-vars": "warn"
        }
    }
]);

export default eslintConfig;
