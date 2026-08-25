import { describe, it, expect, vi, beforeAll } from 'vitest';
import { ref } from 'vue';

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

describe('App', () => {
  it('has a basic structure', () => {
    // Simple test to verify test setup works
    const isDark = ref(false);
    expect(isDark.value).toBe(false);
    isDark.value = true;
    expect(isDark.value).toBe(true);
  });
});
