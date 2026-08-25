# Todo Vue.js - Comprehensive Refactoring Plan

## Overview
Transform the monolithic Vue.js todo app into a professional, scalable architecture following SOLID principles with clean separation of concerns, centralized styling, and modern best practices.

## Design Principles Applied
- **Single Responsibility Principle**: Each component/composable has one reason to change
- **Open/Closed Principle**: Open for extension, closed for modification
- **Liskov Substitution Principle**: Components are interchangeable
- **Interface Segregation**: Minimal, focused interfaces
- **Dependency Inversion**: Depend on abstractions, not concrete implementations

## Target Architecture

```
src/
├── components/          # Reusable UI components (dumb/presentational)
│   ├── common/         # Shared components (Button, Input, Modal, Badge)
│   ├── todo/           # Todo-specific components (TodoItem, TodoList, TodoForm)
│   ├── layout/         # Layout components (Header, Container)
│   └── ui/             # Base UI elements
├── composables/        # Vue 3 composables (logic composition)
│   ├── useTodo.ts      # Todo CRUD operations
│   ├── useFilter.ts    # Filtering & sorting logic
│   ├── useTheme.ts     # Theme management (dark/light)
│   ├── useI18n.ts      # i18n wrapper
│   ├── useSuggestions.ts # AI suggestions
│   └── useLocalStorage.ts # Persistence layer
├── services/           # Business logic & API calls
│   ├── todoService.ts  # Todo business logic
│   ├── storageService.ts # LocalStorage abstraction
│   ├── translateService.ts # Translation service
│   └── suggestionService.ts # Suggestions API
├── types/              # TypeScript interfaces & types
│   ├── todo.ts
│   ├── ui.ts
│   └── app.ts
├── stores/             # State management (if needed - Pinia)
│   └── todoStore.ts
├── styles/             # Tailwind & global styles
│   ├── globals.css     # Global utilities & overrides
│   ├── components.css  # Component-specific styles
│   └── themes.css      # Theme definitions (dark/light)
├── i18n/               # Internationalization
│   ├── locales/
│   │   ├── en.json
│   │   └── ar.json
│   └── index.ts
├── utils/              # Utility functions
│   ├── date.ts         # Date formatting & calculations
│   ├── priority.ts     # Priority constants & helpers
│   ├── classNames.ts   # Class merging utilities
│   └── validators.ts   # Input validation
├── constants/          # App-wide constants
│   ├── priorities.ts
│   ├── categories.ts
│   └── ui.ts
├── App.vue             # Root component
└── main.ts             # Entry point
```

## Implementation Tasks

### Task 1: Setup Folder Structure
- Create all required directories
- Maintain existing node_modules and dist

### Task 2: Define Types & Interfaces
**Files to create:**
- `src/types/todo.ts` - Todo, TodoFilter, TodoSort types
- `src/types/ui.ts` - UI state types
- `src/types/app.ts` - App-level types

### Task 3: Create Constants
**Files to create:**
- `src/constants/priorities.ts` - Priority levels with colors
- `src/constants/ui.ts` - UI configuration
- `src/constants/sort.ts` - Sort options

### Task 4: Extract & Create Services
**Files to create:**
- `src/services/storageService.ts` - LocalStorage wrapper
- `src/services/todoService.ts` - Business logic for todos
- `src/services/translateService.ts` - Translation wrapper
- `src/services/suggestionService.ts` - Suggestion logic

### Task 5: Create Composables
**Files to create:**
- `src/composables/useTodo.ts` - Todo CRUD operations
- `src/composables/useFilter.ts` - Filter & sort logic
- `src/composables/useTheme.ts` - Theme management
- `src/composables/useI18nWrapper.ts` - i18n abstraction
- `src/composables/useSuggestions.ts` - Suggestions handling
- `src/composables/useLocalStorage.ts` - Storage persistence

### Task 6: Create Base Components
**Files to create:**
- `src/components/ui/Button.vue` - Reusable button
- `src/components/ui/Input.vue` - Reusable input
- `src/components/ui/Select.vue` - Reusable select
- `src/components/ui/Badge.vue` - Badge component
- `src/components/ui/Modal.vue` - Modal base

### Task 7: Create Layout Components
**Files to create:**
- `src/components/layout/Header.vue` - Header with controls
- `src/components/layout/Container.vue` - Main container

### Task 8: Create Todo Components
**Files to create:**
- `src/components/todo/TodoForm.vue` - Input form
- `src/components/todo/TodoList.vue` - List wrapper
- `src/components/todo/TodoItem.vue` - Individual todo
- `src/components/todo/TodoActions.vue` - Edit/Delete buttons
- `src/components/todo/TodoMeta.vue` - Category, date, priority badges
- `src/components/todo/TodoFilters.vue` - Filter controls
- `src/components/todo/TodoEmpty.vue` - Empty state

### Task 9: Create Modals
**Files to create:**
- `src/components/modal/EditTodoModal.vue` - Edit modal
- `src/components/modal/DeleteConfirmModal.vue` - Delete confirmation

### Task 10: Centralize Styles
**Files to create:**
- `src/styles/globals.css` - Tailwind setup, custom utilities
- `src/styles/components.css` - Component-specific styles
- `src/styles/themes.css` - Dark/light theme definitions

### Task 11: Refactor Main App
**File to update:**
- `src/App.vue` - Simplified to composition only

### Task 12: Update i18n
**Files to update:**
- `src/i18n/index.ts` - Ensure proper setup

---

## Key Improvements

### 1. Component Separation
- Each component has single responsibility
- Props are well-defined
- Emits are explicit
- No business logic in components

### 2. State Management
- Centralized todo state in composables
- Predictable data flow
- Easy to test and debug

### 3. Styling
- Centralized Tailwind utilities
- No inline conditionals in templates
- Theme abstraction with CSS variables
- No duplicate classes

### 4. Services Layer
- Business logic isolated
- Easy to swap implementations
- Mockable for testing
- Clear API contracts

### 5. Type Safety
- Strict TypeScript types
- Fewer runtime errors
- Better IDE support
- Self-documenting code

### 6. Maintainability
- Clear folder organization
- Single files for single concerns
- Easy to locate features
- Scalable structure

---

## Implementation Order

1. ✅ Define types
2. ✅ Create constants
3. ✅ Build services
4. ✅ Write composables
5. ✅ Create base UI components
6. ✅ Create layout components
7. ✅ Create todo components
8. ✅ Create modals
9. ✅ Centralize styles
10. ✅ Refactor App.vue
11. ✅ Update i18n
12. ✅ Test & verify

---

## Status
- [ ] Types defined
- [ ] Constants created
- [ ] Services implemented
- [ ] Composables created
- [ ] Components built
- [ ] Styles centralized
- [ ] App refactored
- [ ] Tests passing
- [ ] Ready for production
