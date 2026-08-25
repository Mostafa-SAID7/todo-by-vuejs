/**
 * i18n Configuration
 * Vue I18n setup with English and Arabic translations
 */

import { createI18n } from 'vue-i18n'
import type { I18n, I18nOptions } from 'vue-i18n'

/**
 * English translations
 */
const enMessages = {
  app: {
    title: 'My Todos',
    darkMode: '🌙 Dark Mode',
    lightMode: '🌞 Light Mode',
  },
  todo: {
    add: 'Add Todo',
    addPlaceholder: 'Add a new todo...',
    empty: 'No todos yet. Create one to get started!',
    category: 'Category',
    categoryPlaceholder: 'Enter category',
    dueDate: 'Due: {date}',
    edit: 'Edit',
    delete: 'Delete',
    priority: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
    },
    filter: {
      all: 'All Todos',
      active: 'Active',
      completed: 'Completed',
    },
    sort: {
      dueDate: 'Sort by Due Date',
      priority: 'Sort by Priority',
      category: 'Sort by Category',
    },
  },
  modal: {
    edit: {
      title: 'Edit Todo',
      save: 'Save Changes',
      cancel: 'Cancel',
    },
    delete: {
      title: 'Delete Todo',
      message: 'Are you sure you want to delete this todo?',
      confirm: 'Delete',
      cancel: 'Cancel',
    },
  },
}

/**
 * Arabic translations
 */
const arMessages = {
  app: {
    title: 'مهامي',
    darkMode: '🌙 الوضع الداكن',
    lightMode: '🌞 الوضع الفاتح',
  },
  todo: {
    add: 'إضافة مهمة',
    addPlaceholder: 'أضف مهمة جديدة...',
    empty: 'لا توجد مهام حتى الآن. أنشئ واحدة للبدء!',
    category: 'الفئة',
    categoryPlaceholder: 'أدخل الفئة',
    dueDate: 'الموعد النهائي: {date}',
    edit: 'تعديل',
    delete: 'حذف',
    priority: {
      low: 'منخفضة',
      medium: 'متوسطة',
      high: 'عالية',
    },
    filter: {
      all: 'جميع المهام',
      active: 'النشطة',
      completed: 'المكتملة',
    },
    sort: {
      dueDate: 'ترتيب حسب الموعد النهائي',
      priority: 'ترتيب حسب الأولوية',
      category: 'ترتيب حسب الفئة',
    },
  },
  modal: {
    edit: {
      title: 'تعديل المهمة',
      save: 'حفظ التغييرات',
      cancel: 'إلغاء',
    },
    delete: {
      title: 'حذف المهمة',
      message: 'هل أنت متأكد من رغبتك في حذف هذه المهمة؟',
      confirm: 'حذف',
      cancel: 'إلغاء',
    },
  },
}

/**
 * i18n configuration options
 */
const i18nOptions: I18nOptions = {
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: enMessages,
    ar: arMessages,
  },
}

/**
 * Create and export i18n instance
 */
export const i18n: I18n = createI18n(i18nOptions)