# FreshCart - E-Commerce Shopping Application

A modern e-commerce shopping cart application built with React, Vite, and Node.js/Express, featuring product management, shopping cart, checkout, and admin panel with OAuth authentication and passkey support.

## Features

- **Product Management**: Browse products by category, search functionality
- **Shopping Cart**: Add/remove items, update quantities with persistent storage
- **Checkout**: Place orders with delivery address
- **Authentication**: 
  - Google OAuth 2.0
  - Facebook OAuth 2.0
  - WebAuthn/Passkey authentication
- **Admin Panel**: Dashboard with statistics, product management, category management, order tracking
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Toast Notifications**: Success/error feedback

## Tech Stack

### Frontend
- **React 18.2.0** - UI framework
- **Vite 5.0.0** - Build tool with dev server
- **React Router DOM 6.20.0** - Client-side routing
- **Tailwind CSS 3.3.6** - Utility-first CSS framework
- **Zustand 4.4.7** - State management for cart
- **Axios 1.6.2** - HTTP client
- **React Hot Toast 2.4.1** - Notifications
- **@react-oauth/google 0.12.1** - Google OAuth
- **@simplewebauthn/browser 9.0.0** - WebAuthn/Passkey support

### Backend
- **Express.js** - Node.js web framework
- **MongoDB & Mongoose 7.0.0** - Database
- **Passport.js 0.6.0** - Authentication middleware
- **JWT (jsonwebtoken 9.0.0)** - Token-based auth
- **@simplewebauthn/server 8.0.0** - WebAuthn server support
- **Express-session 1.17.3** - Session management
- **Slugify 1.6.6** - URL-friendly slug generation

## Project Structure

```
shopping_cart/
├── client/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom hooks
│   │   ├── context/         # Context for state
│   │   ├── utils/           # Utility functions
│   │   ├── assets/          # Images/media
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── public/              # Static files
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS config
│   └── package.json
│
├── server/                    # Backend (Express)
│   ├── config/              # Configuration files
│   ├── models/              # Mongoose schemas
│   ├── controllers/         # Route controllers
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── utils/               # Utility functions
│   ├── server.js            # Main server file
│   ├── .env.example         # Environment template
│   └── package.json
│
├── .gitignore
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Google OAuth credentials
- Facebook OAuth credentials

### Installation

1. **Clone the repository**
```bash
git clone <repo-url>
cd shopping_cart
```

2. **Setup Backend**
```bash
cd server
npm install

# Create .env file
cp .env.example .env

# Update .env with your credentials
# MONGODB_URI=mongodb://localhost:27017/shopping_cart
# JWT_SECRET=your_jwt_secret
# GOOGLE_CLIENT_ID=your_google_client_id
# GOOGLE_CLIENT_SECRET=your_google_client_secret
# etc.

npm start
```

3. **Setup Frontend**
```bash
cd ../client
npm install

# Create .env file with API configuration
# VITE_API_URL=/api
# VITE_GOOGLE_CLIENT_ID=your_google_client_id
# VITE_FACEBOOK_APP_ID=your_facebook_app_id

npm run dev
```

## Environment Variables

### Server (.env)
```
MONGODB_URI=mongodb://localhost:27017/shopping_cart
JWT_SECRET=your_jwt_secret_key
PORT=5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
RP_ID=localhost
RP_NAME=FreshCart
CLIENT_URL=http://localhost:5173
SESSION_SECRET=your_session_secret
```

### Client (.env)
```
VITE_API_URL=/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_FACEBOOK_APP_ID=your_facebook_app_id
```

## API Endpoints

### Authentication
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/facebook` - Facebook OAuth login
- `GET /api/auth/facebook/callback` - Facebook OAuth callback
- `POST /api/auth/passkey/register/options` - Passkey registration options
- `POST /api/auth/passkey/register/verify` - Verify passkey registration
- `POST /api/auth/passkey/authenticate/options` - Passkey auth options
- `POST /api/auth/passkey/authenticate/verify` - Verify passkey authentication
- `GET /api/auth/me` - Get current user (requires auth)

### Products
- `GET /api/products` - Get all products (with pagination, filtering)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

### Orders
- `POST /api/orders` - Create order (auth required)
- `GET /api/orders/my` - Get user's orders (auth required)
- `GET /api/orders/all` - Get all orders (admin only)

## Authentication Flow

### OAuth (Google/Facebook)
1. User clicks login button
2. Redirected to OAuth provider
3. User authorizes
4. Callback with user info
5. User document created/updated in DB
6. JWT token generated and returned
7. Token stored in localStorage
8. Redirected to home page

### Passkey (WebAuthn)
1. User registers with email
2. Browser generates passkey
3. Public key stored in DB
4. For login, challenge-response flow
5. JWT token generated on successful auth

## Running the Application

### Development Mode
```bash
# Terminal 1: Backend
cd server
npm start

# Terminal 2: Frontend
cd client
npm run dev
```

Backend runs on `http://localhost:5000`
Frontend runs on `http://localhost:5173` with API proxy to backend

### Production Build
```bash
# Frontend
cd client
npm run build

# Backend
cd server
npm start
```

## Features Detail

### Cart Management
- Uses Zustand for state management with localStorage persistence
- Automatic item quantity increment if already in cart
- Real-time subtotal and total calculation
- Fixed delivery fee of 250 LKR
- Currency formatted in LKR (রু.)

### Admin Panel
- Dashboard with key statistics (product count, order count, revenue)
- Product management (add/edit/delete)
- Category management with auto-slug generation
- Recent orders view

### Responsive Design
- Mobile-first approach
- Tailwind CSS responsive utilities
- Breakpoints: sm, md, lg, xl, 2xl

## Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway/Render)
```bash
# Set environment variables
# Deploy server/ folder
npm start
```

## Troubleshooting

### MongoDB Connection
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network access for MongoDB Atlas

### OAuth Issues
- Verify credentials in .env
- Check redirect URIs in OAuth provider settings
- Ensure CLIENT_URL matches frontend domain

### CORS Issues
- Check CORS configuration in server.js
- Verify CLIENT_URL environment variable

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Create pull request

## License

MIT License

## Support

For issues and questions, please create an issue in the repository.

