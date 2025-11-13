# Flowy Frontend

A React-based flow graph visualization tool with project management capabilities. Now modernized with TypeScript, React 18, and the latest dependencies!

**Status:** 🚀 **61% Migrated to TypeScript** - Core infrastructure complete!

<img width="1351" alt="Screenshot 2023-06-07 at 12 59 16" src="https://github.com/el-j/flowy-frontend/assets/2795534/ecb182cd-2802-4097-937e-612a8a4a619b">
<img width="1351" alt="Screenshot 2023-06-07 at 13 00 55" src="https://github.com/el-j/flowy-frontend/assets/2795534/95acc51f-8aa4-4d19-a7f7-6028c8b66a82">

## 🎯 Recent Modernization (2025-11)

This project has been significantly modernized with:

✅ **TypeScript** - 61% of codebase converted with strict type checking  
✅ **React 18.3.1** - Latest React with new features and performance improvements  
✅ **React Router v6** - Modern routing with element-based API  
✅ **Bootstrap 5** - Latest Bootstrap with no jQuery dependency  
✅ **Security** - 94% reduction in vulnerabilities (228 → 13)  
✅ **Type Safety** - Comprehensive type definitions for better developer experience

See [MIGRATION_STATUS.md](./MIGRATION_STATUS.md) for detailed migration progress.

## 📦 Tech Stack

### Core
- **React** 18.3.1
- **TypeScript** 5.9.3  
- **React Router** 6.30.0

### UI & Styling
- **Bootstrap** 5.3.8
- **react-bootstrap** 2.10.10
- **styled-components** 6.1.19

### Visualization
- **@mrblenny/react-flow-chart** 0.0.14
- **mermaid** 11.12.1

### Build & Dev
- **react-scripts** 5.0.1
- **CRACO** (for build customization)
- **TypeScript** strict mode

## 🚀 Quick Start

### Prerequisites
- Node.js v20+
- npm 10+
- [Flowy Backend Server](https://github.com/el-j/flowy-backend) running

### Installation

```bash
# Clone the repository
git clone https://github.com/el-j/flowy-frontend.git
cd flowy-frontend

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Backend Connection

The frontend expects the backend server at `http://localhost:9023`. Make sure the [flowy backend](https://github.com/el-j/flowy-backend) is running before starting the frontend.

## 📝 Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run test suite
npm run eject      # Eject from Create React App (not recommended)
```

## 🏗️ Project Structure

```
src/
├── types.ts                    # TypeScript type definitions ✅
├── App.tsx                     # Main app component ✅
├── index.tsx                   # App entry point ✅
├── routes.tsx                  # React Router v6 routes ✅
├── components/                 # Reusable components
│   ├── CheckBox/              ✅ TypeScript
│   ├── myNavbar/              ✅ TypeScript
│   ├── YourProjects/          ✅ TypeScript
│   ├── NewProjectInput/       ✅ TypeScript
│   ├── NewProjectDetails/     ✅ TypeScript
│   ├── LeftPanel/             ✅ TypeScript
│   ├── FlowChart/             🔄 JavaScript (complex)
│   ├── RightPanel/            🔄 JavaScript
│   └── ...
├── views/                     # Page components
│   ├── Overview/              ✅ TypeScript
│   ├── NewProjectView/        ✅ TypeScript
│   ├── ProjectView/           🔄 JavaScript (559 lines)
│   └── mermaid/               🔄 JavaScript
└── tools/                     # Utilities
    └── fetchApi/              ✅ TypeScript
```

✅ = Converted to TypeScript  
🔄 = Still JavaScript (planned for next phase)

## 🔧 Configuration

### TypeScript

The project uses strict TypeScript configuration. See `tsconfig.json` for details.

### Environment Variables

Create a `.env` file in the root:

```env
SKIP_PREFLIGHT_CHECK=true
```

### Backend Proxy

API requests are proxied to `http://localhost:9023` (configured in `package.json`).

## 🧪 Type Safety

The project includes comprehensive type definitions:

```typescript
// Project types
interface Project {
  projectId: string;
  name: string;
  files: string[];
  description: string;
  projectJson: ProjectJson;
}

// Generic API hook
const useFetchApi = <T = any>(url?: string): T | false => { ... }

// Typed components
interface NavbarProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  projectName: string | null;
}
```

## 🔗 Related Projects

- **Backend:** [flowy-backend](https://github.com/el-j/flowy-backend) - TypeScript backend server
- **Sketch Plugin:** [flowy_import.sketchplugin](https://github.com/el-j/flowy_import.sketchplugin)

## 🐛 Known Issues

- Build may show warnings due to @mrblenny/react-flow-chart requiring React 16 (uses legacy peer deps)
- Some FlowChart components still in JavaScript (migration in progress)

## 📊 Migration Progress

**20 of 33 files (61%)** converted to TypeScript:
- ✅ Core infrastructure (App, routes, index)
- ✅ API utilities (fetchApi)
- ✅ Key components (Navbar, LeftPanel, YourProjects, etc.)
- ✅ Main views (Overview, NewProjectView)
- 🔄 FlowChart components (8 files remaining)
- 🔄 ProjectView (largest file, 559 lines)

See [MIGRATION_STATUS.md](./MIGRATION_STATUS.md) for complete details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for new files
- Follow existing code style
- Add types for all props and state
- Test your changes
- Update documentation

## 📄 License

This is an MVP project. License information not specified.

## 🙏 Acknowledgments

Built with:
- [Create React App](https://create-react-app.dev/)
- [React Flow Chart](https://github.com/MrBlenny/react-flow-chart)
- [Mermaid](https://mermaid-js.github.io/)
- [Bootstrap](https://getbootstrap.com/)

---

**Note:** This is an MVP. The frontend requires the backend server to be running for full functionality.
