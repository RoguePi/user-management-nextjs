# UserHub - User Management System

A lightweight, elegant user management system built with Next.js 15, featuring a modern dashboard for creating and viewing users with a beautiful UI.

## ✨ Features

- **Modern Dashboard** - Clean, responsive interface with gradient backgrounds
- **User Management** - Create, view, and search users
- **Real-time Statistics** - Dashboard showing total users, active users, and new registrations
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **File-based Storage** - Uses JSON file storage for simplicity
- **TypeScript Support** - Fully typed for better development experience
- **Tailwind CSS** - Modern styling with utility-first CSS framework

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/user-management-nextjs.git
cd user-management-nextjs
```

2. Install dependencies:
```bash
npm run install-deps
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
user-management-nextjs/
├── user-management/
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/users/          # API routes
│   │   │   ├── users/              # Users page
│   │   │   ├── layout.tsx          # Root layout
│   │   │   └── page.tsx            # Dashboard
│   │   └── lib/
│   │       └── api.ts              # API utilities
│   ├── public/
│   │   └── jsonUsersData/
│   │       └── users.json          # User data storage
│   └── package.json
├── package.json                    # Root package.json
└── README.md
```

## 🎯 Usage

### Dashboard
- View user statistics and metrics
- Quick overview of total users, active users, and new registrations

### User Management
- **View Users**: Browse all users in a card-based layout
- **Search**: Filter users by name, email, or company
- **Create User**: Add new users with complete profile information
- **User Details**: Click on any user card to view detailed information

### API Endpoints

- `GET /api/users` - Fetch all users
- `POST /api/users` - Create a new user

## 🛠️ Built With

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Geist Font** - Modern typography

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨💻 Author

**Rogelyn Pizon**

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vercel for hosting and deployment solutions