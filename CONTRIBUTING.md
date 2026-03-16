# Contributing to Codepiler

Thank you for your interest in contributing to Codepiler.

We welcome improvements, bug fixes, and new features.

---

## Development Setup

Clone the repository:

```bash
git clone https://github.com/<your-username>/codepiler.git
cd codepiler
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## Project Architecture

Codepiler follows a **feature-based architecture**.

Key directories:

```
src/
 ├─ components   → UI components
 ├─ store        → Zustand state stores
 ├─ features     → business logic modules
 ├─ hooks        → reusable hooks
 ├─ lib          → utility functions
 ├─ constants    → configuration values
 └─ types        → TypeScript types
```

Guidelines:

- UI components should remain **pure and presentation-focused**
- Business logic should live inside **features/**
- Global state should be managed through **Zustand stores**

---

## Code Style

We use:

- **ESLint**
- **Prettier**

Before committing code:

```bash
npm run lint
npm run format
```

---

## Commit Guidelines

We follow **Conventional Commits**.

Examples:

```
feat: add repo zip loader
feat: implement prompt builder
fix: resolve token estimation bug
docs: update README
refactor: improve repo tree parsing
```

---

## Pull Request Process

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/my-feature
```

3. Commit your changes
4. Push your branch
5. Open a Pull Request

Please include:

- Clear description
- Screenshots if UI changes
- Explanation of the change

---

## Issue Reporting

If you find a bug, please open an issue with:

- Description of the problem
- Steps to reproduce
- Expected vs actual behavior

---

## Code of Conduct

Please be respectful and constructive in discussions.

---

## Questions

If you have questions about the project architecture or contribution process, feel free to open a discussion or issue.

Thank you for contributing to Codepiler!
