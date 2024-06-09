# ESLint and Prettier Setup for Next.js Project

## Install Packages

```sh
npm i -D  @types/eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser @next/eslint-plugin-next eslint eslint-config-next eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-tailwindcss prettier prettier-plugin-organize-imports prettier-plugin-tailwindcss
```

### ESLint Packages

- `eslint`: The core ESLint linting library.
- `@types/eslint`: Allows ESLint to type-checked.
- `@typescript-eslint/eslint-plugin`: Provides TypeScript support through ESLint.
- `@typescript-eslint/parser`: Allows ESLint to understand TypeScript.
- `@next/eslint-plugin-next`: Provides ESLint rules specific to Next.js.
- `eslint-config-next`: Default ESLint configuration for Next.js projects.
- `eslint-plugin-react`: Provides React specific linting rules.
- `eslint-plugin-react-hooks`: Provides rules for React hooks.
- `eslint-plugin-jsx-a11y`: Accessibility rules for JSX elements.
- `eslint-plugin-prettier`: Runs Prettier as an ESLint rule.
- `eslint-plugin-tailwindcss`: Tailwind CSS specific linting rules.

### Prettier Packages

- `prettier`: The core formatting library.
- `prettier-plugin-organize-imports`: Automatically organizes and sorts your imports.
- `prettier-plugin-tailwindcss`: Integrates Tailwind CSS sorting into Prettier.

## Configuration ESLint Example

Create a `.eslintrc.cjs` file in your project root with the following configuration:

```json
/** @type {import("eslint").Linter.Config} */
const config = {
  "extends": [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "prettier"
  ],
  "plugins": [
    "@typescript-eslint",
    "react",
    "jsx-a11y",
    "react-hooks",
    "tailwindcss"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".tsx"] }]
  }
};
module.exports = config;
```

## Configuration Prettier Example

Create a `prettier.config.js` file in your project root with the following configuration:

```json
/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  "semi": false,
  "singleQuote": true,
  "plugins": ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"]
};

export default config;
```

## Example of Incorrect Code

Here's an example of code that doesn't follow the specified ESLint rules:

```json
import React, { useEffect } from 'react';

const Component = () => {
  useEffect(() => {
    console.log('Component mounted.');
  }, []); // React Hook useEffect has a missing dependency: 'console.log'. Either include it or remove the dependency array.

  return <div className="bg-red-500">Hello, world!</div>
}


```
