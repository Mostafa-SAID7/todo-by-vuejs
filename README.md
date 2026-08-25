# 📝 Todo App

A modern, responsive, and beautifully animated todo application built with Vue 3, TypeScript, and Tailwind CSS.

## ✨ Features

- **🎨 Professional Design** - Orange accent theme with smooth light/dark modes
- **📱 Fully Responsive** - Mobile, tablet, and desktop optimized
- **⚡ Smooth Animations** - 500ms color transitions and modern animations
- **🎯 Clean Architecture** - SOLID principles with organized structure
- **🌍 Multi-language** - English & Arabic with RTL support
- **♿ Accessible** - WCAG AA compliant with keyboard navigation
- **🔄 Real-time Sync** - LocalStorage persistence
- **🎭 Dark Mode** - Deep navy theme with warm orange accents

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Run tests
npm run test
```

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Vue 3** | UI framework (Composition API) |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling & responsive design |
| **Vite** | Lightning-fast build tool |
| **Lucide Icons** | Professional icon library |
| **Vue i18n** | Internationalization |

## 📂 Project Structure

```
src/
├── components/       # Vue components (UI, Layout, Todo)
├── composables/      # Reusable logic hooks
├── services/         # Business logic layer
├── types/            # TypeScript definitions
├── constants/        # App configuration
├── utils/            # Helper functions
├── i18n/             # Translations
├── styles/           # Global styles & animations
├── App.vue           # Root component
└── main.ts           # Entry point
```

## 🎨 Color System

### Light Mode
- Primary: `#ffffff` | Secondary: `#faf8f7`
- Accent: `#ff7a45` (Orange)
- Text: `#18212f` (Dark)

### Dark Mode
- Primary: `#0f1419` (Deep Navy) | Secondary: `#1a1f2e`
- Accent: `#ff8955` (Bright Orange)
- Text: `#f5f7fa` (White)

## 📊 Performance

| Metric | Value |
|---|---|
| Build Time | ~15s |
| CSS Size | 51.42 kB (gzip: 9.46 kB) |
| JS Size | 166.93 kB (gzip: 56.55 kB) |
| Animations | 60fps smooth |
| Lighthouse Score | 95+ |

## 🔧 Configuration Files

- `vite.config.ts` - Build configuration
- `vitest.config.ts` - Test runner setup
- `tsconfig.json` - TypeScript settings
- `tailwind.config.js` - Tailwind customization
- `postcss.config.js` - PostCSS plugins

## 📱 Browser Support

✅ Chrome 90+ | ✅ Firefox 88+ | ✅ Safari 14+ | ✅ Edge 90+ | ✅ Mobile browsers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Built with ❤️ using Vue 3 & TypeScript

---

**Ready to deploy?** Build with `npm run build` and deploy the `dist/` folder.
