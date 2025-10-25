import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import App from './App.vue';
import { i18n } from './i18n';

// Mock the `useI18n` function
vi.mock('vue-i18n', async (importOriginal) => {
  const actual = await importOriginal();
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

    wrapper.vm.todos = [
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
    wrapper.vm.sortBy = 'dueDate';

    // Wait for the computed property to update
    await wrapper.vm.$nextTick();

    // Get the sorted todos
    const sortedTodos = wrapper.vm.filteredAndSortedTodos;

    // Expectations
    expect(sortedTodos.length).toBe(3);
    expect(sortedTodos[0].text).toBe('Todo with early due date');
    expect(sortedTodos[1].text).toBe('Todo with late due date');
    expect(sortedTodos[2].text).toBe('Todo without due date');
  });
});
