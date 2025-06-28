# 🧠 Second Brain - Frontend

A modern, full-stack personal knowledge management application built with React, TypeScript, and Tailwind CSS. This frontend interface allows users to organize, share, and manage their digital content in a beautiful and intuitive way.

## 🚀 Features

### 📝 Content Management
- **Multi-format Support**: Store and organize text, images, videos, audio files, and web links
- **Dynamic Cards**: Beautiful card-based UI that adapts to different content types
- **Rich Content Preview**: 
  - Text content with full formatting
  - Embedded video players for YouTube content
  - Custom audio player with controls
  - Image display with proper scaling
  - Link previews with article metadata

### 🏷️ Advanced Tagging System
- **Smart Tag Management**: Create and organize content with tags
- **Tag Autocomplete**: Intelligent tag suggestions while typing
- **Tag Explorer**: View all available tags in a dedicated section
- **Tag-based Filtering**: Filter content by type or view all tags

### 🔐 Secure Authentication
- **JWT Authentication**: Secure login/signup with JSON Web Tokens
- **Token-based Security**: All API calls protected with Authorization headers
- **Persistent Sessions**: Stay logged in across browser sessions
- **Secure Routes**: Protected dashboard and content areas

### 🤝 Content Sharing
- **Brain Sharing**: Share your entire knowledge base with others
- **Public Read-only Access**: Shared brains are view-only for visitors
- **Shareable Links**: Generate and copy shareable links easily
- **Privacy Controls**: Enable/disable sharing with one click

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme Ready**: Built with modern design principles
- **Smooth Animations**: Delightful transitions and hover effects
- **Loading States**: Proper feedback during data operations
- **Error Handling**: User-friendly error messages and recovery

### 🗂️ Content Organization
- **Content Filtering**: Filter by content type (text, image, video, audio, link)
- **Search & Discovery**: Browse all content or filter by specific types
- **Real-time Updates**: Instant content refresh after adding/deleting
- **Drag & Drop Ready**: UI prepared for future drag-and-drop features

## 🛠️ Tech Stack

### Core Technologies
- **React 19** - Latest React with modern hooks and concurrent features
- **TypeScript** - Type-safe development with full IDE support
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework for rapid styling

### Key Libraries
- **React Router DOM** - Client-side routing with nested routes
- **React Responsive** - Responsive design hooks for different screen sizes
- **Axios** - HTTP client for API communication

### Development Tools
- **ESLint** - Code linting with React-specific rules
- **TypeScript Compiler** - Static type checking
- **Vite Dev Server** - Hot module replacement for fast development

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   │   ├── AddContent.tsx    # Add content modal
│   │   ├── Card.tsx          # Content display card
│   │   ├── BrainShare.tsx    # Sharing controls
│   │   ├── Button.tsx        # Reusable button component
│   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   ├── TagSelector.tsx   # Tag selection component
│   │   └── ...
│   ├── ContentSection.tsx    # Main content display area
│   ├── SharedBrain.tsx       # Public shared view
│   ├── login.tsx            # Login form
│   └── signUp.tsx           # Registration form
├── icons/               # SVG icon components
│   ├── audioIcon.tsx
│   ├── videoIcon.tsx
│   ├── textIcon.tsx
│   └── ...
├── config.ts           # App configuration
├── App.tsx             # Main app component with routing
└── main.tsx            # App entry point
```

## 🚦 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Backend API** running on port 3000

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Extra-Memory-FrontEnd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Update `src/config.ts` with your backend URL
   ```typescript
   export const BACKEND_URL = 'http://localhost:3000';
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🎯 Usage Guide

### Getting Started
1. **Register/Login**: Create an account or sign in with existing credentials
2. **Add Content**: Click "Add Content" to create your first entry
3. **Organize**: Use tags to categorize your content
4. **Filter**: Use the sidebar to filter content by type
5. **Share**: Enable brain sharing to let others view your content

### Content Types
- **Text**: Rich text content for notes and thoughts
- **Image**: Upload or link to images with automatic preview
- **Video**: Embed YouTube videos or other video content
- **Audio**: Audio files with custom player controls
- **Link**: Web links with automatic article preview

### Navigation
- **All Notes**: View all your content
- **Content Types**: Filter by text, image, video, audio, or links
- **Tags**: View and explore all available tags
- **Share**: Manage sharing settings

## 🔧 Component Architecture

### Key Components

#### `Card.tsx`
- Displays individual content items
- Adapts rendering based on content type
- Includes delete functionality (owner only)
- Supports read-only mode for shared views

#### `AddContent.tsx`
- Modal for creating new content
- Form validation and error handling
- Tag selection with autocomplete
- Real-time content preview

#### `ContentSection.tsx`
- Main content display area
- Handles filtering and search
- Manages loading states
- Supports both content and tag views

#### `Sidebar.tsx`
- Navigation and filtering controls
- Responsive design for mobile/desktop
- Content type icons and counts

#### `BrainShare.tsx`
- Sharing controls and settings
- Generate shareable links
- Enable/disable sharing toggle

### State Management
- **Local State**: Component-level state with React hooks
- **Props Drilling**: Parent-child communication
- **Callback Functions**: Event handling and data refresh
- **Context Ready**: Architecture supports React Context if needed

## 🎨 Styling & Design

### Design System
- **Color Palette**: Purple primary with gray neutrals
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent padding and margins
- **Shadows**: Subtle depth with card shadows

### Responsive Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

### Component Styling
- **Utility Classes**: Tailwind CSS for rapid development
- **Hover Effects**: Interactive feedback on all buttons
- **Loading States**: Visual feedback during operations
- **Error States**: Clear error messages and recovery

## 🔒 Security Features

### Frontend Security
- **JWT Token Storage**: Secure localStorage token management
- **Route Protection**: Private routes require authentication
- **API Authorization**: All requests include Bearer tokens
- **Input Validation**: Client-side form validation
- **XSS Prevention**: Proper content sanitization

### Content Protection
- **Owner Validation**: Users can only modify their own content
- **Read-only Sharing**: Shared content is view-only
- **Secure Deletion**: Confirmation dialogs prevent accidents

## 🚀 Performance

### Optimization Features
- **Code Splitting**: Lazy loading for better performance
- **Image Optimization**: Proper image loading and sizing
- **Bundle Optimization**: Vite's optimized build process
- **Tree Shaking**: Unused code elimination

### Development Features
- **Hot Module Replacement**: Instant updates during development
- **TypeScript**: Compile-time error detection
- **ESLint**: Code quality and consistency
- **Fast Refresh**: React component state preservation

## 🔄 API Integration

### Endpoints Used
```typescript
POST /api/v1/signup          # User registration
POST /api/v1/signin          # User login
GET  /api/v1/content         # Fetch user content
POST /api/v1/content         # Create new content
DELETE /api/v1/content       # Delete content
GET  /api/v1/tags           # Fetch all tags
POST /api/v1/brain/share    # Enable sharing
PUT  /api/v1/brain/share    # Disable sharing
GET  /api/v1/brain/:userId  # View shared content
```

### Request/Response Handling
- **Error Handling**: Comprehensive error catching and user feedback
- **Loading States**: Visual feedback during API calls
- **Retry Logic**: User-friendly error recovery
- **Token Management**: Automatic token inclusion in headers

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Content creation (all types)
- [ ] Content deletion with confirmation
- [ ] Tag management and filtering
- [ ] Content sharing functionality
- [ ] Responsive design on different devices
- [ ] Error handling and recovery

## 🐛 Troubleshooting

### Common Issues

**"Failed to fetch contents"**
- Ensure backend server is running on port 3000
- Check CORS configuration in backend
- Verify JWT token in localStorage

**"No authentication token found"**
- Clear localStorage and login again
- Check if token expired
- Ensure login was successful

**Content not updating**
- Check network connectivity
- Verify backend API endpoints
- Clear browser cache if needed

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment Options
- **Vercel**: Easy deployment with GitHub integration
- **Netlify**: Static site hosting with continuous deployment
- **AWS S3**: Static website hosting
- **Custom Server**: Deploy dist folder to any web server

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### Code Style
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write descriptive component names
- Include proper error handling

## 📝 License

This project is licensed under the MIT License.

## 👥 Support

For support or questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the component documentation

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
