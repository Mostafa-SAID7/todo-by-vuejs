import { describe, it, expect, vi, beforeAll } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import App from './App.vue';
import { i18n } from './i18n';

// Mock window.matchMedia for jsdom
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

// Mock the `useI18n` function
vi.mock('vue-i18n', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    useI18n: () => ({
      t: (key: string) => key,
      locale: ref('en'),
    }),
  };
});

describe('App', () => {
  it('sorts todos with due dates correctly, placing those without due dates at the end', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [i18n],
      },
    });

    // Get the component instance
    const vm = wrapper.vm as any;

    // Set todos via reactive array
    vm.todos = [
      {
        id: 1,
        text: 'Todo with late due date',
        completed: false,
        category: 'Work',
        dueDate: '2024-12-31',
        priority: 'medium',
      },
      {
        id: 2,
        text: 'Todo with early due date',
        completed: false,
        category: 'Personal',
        dueDate: '2024-01-01',
        priority: 'high',
      },
      {
        id: 3,
        text: 'Todo without due date',
        completed: false,
        category: 'Misc',
        dueDate: '',
        priority: 'low',
      },
    ];

    // Set sort by due date
    vm.sortBy = 'dueDate';

    // Wait for the computed property to update
    await wrapper.vm.$nextTick();

    // Get the sorted todos from computed property
    const sortedTodos = vm.filteredAndSortedTodos;

    // Expectations
    expect(sortedTodos.length).toBe(3);
    expect(sortedTodos[0].text).toBe('Todo with early due date');
    expect(sortedTodos[1].text).toBe('Todo with late due date');
    expect(sortedTodos[2].text).toBe('Todo without due date');
  });
});
