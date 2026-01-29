# AGENTS.md

This document provides guidelines for agentic coding agents operating in this repository.

## Project Overview

PokeTeam is a TypeScript/React application built with Vite. It uses React Context for state management, PostCSS for styling (with nesting and mixins), and the PokéAPI for data. The codebase follows strict TypeScript practices with ts-standard linting.

## Build Commands

```bash
# Development
yarn dev          # Start dev server with hot reload
yarn build        # Build for production
yarn preview      # Preview production build

# Code Quality
yarn lint         # Run ESLint
yarn check        # Type checking
```

There are no dedicated test commands currently configured.

## Code Style Guidelines

### TypeScript

- Use explicit types for function parameters and return values
- Component return types: `const Component: FC<Props> = (): JSX.Element => { ... }`
- Hook return types: `interface useXxxRes { ... }` followed by `const useXxx = (): useXxxRes => { ... }`
- Use `unknown` instead of `any` when type is unknown; provide type guards or casting when narrowing
- Prefer interfaces for object shapes, use `type` for unions, mapped types, and utility types

### Imports

- Use path aliases configured in tsconfig (`src/` maps to root)
- Relative imports for sibling files: `./Component`, `../utils`
- Absolute imports for everything else: `components/Xxx`, `hooks/useXxx`, `types/xxx`
- Group imports: React → libraries → absolute imports → relative imports
- Named imports for React hooks: `import { FC, useEffect, useState } from 'react'`
- Default imports for components: `import Component from 'components/Component'`

### Naming Conventions

- **Components**: PascalCase (`PokeTeam`, `MoveCard`)
- **Hooks**: camelCase with `use` prefix (`usePokemon`, `MoveSearchModal`)
- **Files**: kebab-case for components/hooks (`poke-team.tsx`), PascalCase for types (`pokemon.ts`)
- **Variables**: camelCase (`pokemonTeam`, `loading`)
- **Constants**: SCREAMING_SNAKE_CASE for config values (`POKE_API`)
- **Interfaces**: PascalCase with descriptive names (`PokemonAbility`, `TypeRelationsAPI`)
- **Types**: Prefer descriptive names over single letters (`weaknessByType` not `wbt`)

### Components

- Use `FC<Props>` type for functional components
- Destructure props with explicit typing: `const Component: FC<{ title: string }> = ({ title }) => { ... }`
- Keep components focused; extract complex logic into custom hooks
- Use early returns for loading states and conditionals

### State Management

- Use Context for global state (`context/AppContext`, `context/modals/`)
- Use `useReducer` for complex state logic with typed actions
- Create custom hooks to encapsulate context usage (`useAppContext`, `usePokemon`)
- Pattern: `interface XxxRes { state: X; action: Y }`

### Error Handling

- Throw descriptive errors: `throw new Error(\`Failed to load pokemon ${pokemon.name}\`)`
- Handle async errors with `.catch()` at the top level of async flows
- Log errors appropriately; do not expose sensitive information
- For user-facing errors, show meaningful messages via UI state

### Styling

- Use CSS Modules (`*.module.css`) for component-scoped styles
- PostCSS nesting enabled: `&:hover { ... }`, `.parent { .child { ... } }`
- PostCSS mixins available in `src/mixins/`
- Use CSS custom properties from `src/variables.css`
- Class naming: kebab-case in CSS, access via `styles.className` in TSX

### Async Operations

- Use `async/await` with proper error handling
- Prefer `Promise.all()` for parallel requests
- Handle loading states explicitly (`const [loading, setLoading] = useState(false)`)
- Use `useDebounce` hook for search inputs

### API Services

- Keep API calls in `src/services/`
- Use `fetch` with proper type responses
- Transform API data using typed transformer functions
- Constants for API endpoints in `src/consts.ts`

## File Organization

```
src/
├── components/       # React components (each in own folder)
├── context/          # Context providers and reducers
├── hooks/            # Custom hooks (useXxx pattern)
├── services/         # API calls and data fetching
├── types/            # TypeScript interfaces and types
├── utils/            # Utility functions
├── data/             # Static data files
└── mixins/           # PostCSS mixins
```

## Linting

The project uses `ts-standard` (ESLint-based, no config needed). Run `yarn lint` to check. Key rules enforced:
- No semicolons
- Single quotes
- Strict TypeScript typing
- Consistent import ordering

## Common Patterns

- **Modal hooks**: `useSearchModal` pattern with reducer-based visibility
- **Menu items**: Array of `{ icon, label, action, error? }` objects
- **Masonry layout**: Use `ResponsiveMasonry` with `columnsCountBreakPoints`
- **Ref handling**: `useRef<Array<HTMLElement | null>>([])` with null checks

## Environment

- Node.js 16+
- TypeScript 4.6+
- React 18.2.0
- Vite 3.1+
