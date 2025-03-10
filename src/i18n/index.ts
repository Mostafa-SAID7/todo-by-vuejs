import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      app: {
        title: 'Enhanced Todo App',
        darkMode: '🌙 Dark Mode',
        lightMode: '🌞 Light Mode'
      },
      todo: {
        add: 'Add Todo',
        addPlaceholder: 'Add a new todo...',
        category: 'Category',
        categoryPlaceholder: 'Category',
        dueDate: 'Due: {date}',
        priority: {
          low: 'Low Priority',
          medium: 'Medium Priority',
          high: 'High Priority'
        },
        edit: 'Edit',
        delete: 'Delete',
        filter: {
          all: 'All',
          active: 'Active',
          completed: 'Completed'
        },
        sort: {
          dueDate: 'Sort by Due Date',
          priority: 'Sort by Priority',
          category: 'Sort by Category'
        }
      },
      modal: {
        edit: {
          title: 'Edit Todo',
          save: 'Save',
          cancel: 'Cancel'
        },
        delete: {
          title: 'Delete Todo',
          message: 'Are you sure you want to delete this todo?',
          confirm: 'Delete',
          cancel: 'Cancel'
        }
      }
    },
    ar: {
      app: {
        title: 'تطبيق المهام المحسّن',
        darkMode: '🌙 الوضع الداكن',
        lightMode: '🌞 الوضع الفاتح'
      },
      todo: {
        add: 'إضافة مهمة',
        addPlaceholder: 'إضافة مهمة جديدة...',
        category: 'الفئة',
        categoryPlaceholder: 'الفئة',
        dueDate: 'الموعد النهائي: {date}',
        priority: {
          low: 'أولوية منخفضة',
          medium: 'أولوية متوسطة',
          high: 'أولوية عالية'
        },
        edit: 'تعديل',
        delete: 'حذف',
        filter: {
          all: 'الكل',
          active: 'النشط',
          completed: 'المكتمل'
        },
        sort: {
          dueDate: 'ترتيب حسب الموعد النهائي',
          priority: 'ترتيب حسب الأولوية',
          category: 'ترتيب حسب الفئة'
        }
      },
      modal: {
        edit: {
          title: 'تعديل المهمة',
          save: 'حفظ',
          cancel: 'إلغاء'
        },
        delete: {
          title: 'حذف المهمة',
          message: 'هل أنت متأكد من حذف هذه المهمة؟',
          confirm: 'حذف',
          cancel: 'إلغاء'
        }
      }
    }
  }
})