# Event Management System Backend

This is the backend for the Event Management System, built with Node.js, Express, and MongoDB.

## Tech Stack

- **Node.js**: Runtime environment
- **Express**: Web framework
- **MongoDB**: Database (using Mongoose ODM)
- **TypeScript**: Typed JavaScript
- **JWT**: Authentication
- **Bcryptjs**: Password hashing
- **Helmet**: Security middleware
- **Morgan**: HTTP request logger
- **Cors**: Cross-Origin Resource Sharing

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running locally

### Installation

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and add the following:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/event-management
   JWT_SECRET=supersecretkey
   NODE_ENV=development
   ```

### Running the server

- **Development mode**:
  ```bash
  npm run dev
  ```
- **Production mode**:
  ```bash
  npm run build
  npm start
  ```

## API Endpoints

### Auth

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user
- `POST /api/auth/logout`: Logout user
- `GET /api/auth/me`: Get current user info

### Users

- `GET /api/users`: List all users (Admin only)
- `GET /api/users/:id`: Get user by ID (Admin/Self)
- `PUT /api/users/:id`: Update user profile (Admin/Self)
- `DELETE /api/users/:id`: Delete user (Admin only)
- `GET /api/users/:id/tickets`: Get user tickets/registrations

### Events

- `GET /api/events`: List all published events
- `GET /api/events/:id`: Get event details
- `POST /api/events`: Create an event (Organizer/Admin)
- `PUT /api/events/:id`: Update event (Owner/Admin)
- `DELETE /api/events/:id`: Delete event (Owner/Admin)

### Sessions

- `GET /api/events/:id/sessions`: Get sessions for an event
- `POST /api/events/:id/sessions`: Add session (Organizer/Admin)
- `PUT /api/events/:id/sessions/:sid`: Update session (Organizer/Admin)
- `DELETE /api/events/:id/sessions/:sid`: Delete session (Organizer/Admin)

### Registrations

- `POST /api/events/:id/register`: Register for an event (Attendee)
- `GET /api/events/:id/attendees`: List attendees (Organizer/Admin)
- `DELETE /api/registrations/:id`: Cancel registration (Self/Admin)

### Sponsors

- `GET /api/events/:id/sponsors`: List sponsors (Public)
- `POST /api/events/:id/sponsors`: Add sponsor (Organizer/Admin)
- `PUT /api/events/:id/sponsors/:sid`: Update sponsor (Organizer/Admin)
- `DELETE /api/events/:id/sponsors/:sid`: Remove sponsor (Organizer/Admin)
- `POST /api/events/:id/sponsors/:sid/assets`: Upload assets (Sponsor/Admin)

### Exhibitors

- `GET /api/events/:id/exhibitors`: List exhibitors (Public)
- `POST /api/events/:id/exhibitors`: Add exhibitor (Organizer/Admin)
- `PUT /api/events/:id/exhibitors/:eid`: Update exhibitor (Owner/Organizer/Admin)
- `DELETE /api/events/:id/exhibitors/:eid`: Remove exhibitor (Organizer/Admin)

### Venues

- `GET /api/venues`: List venues
- `POST /api/venues`: Add venue (Organizer/Admin)
- `PUT /api/venues/:id`: Update venue (Organizer/Admin)
- `DELETE /api/venues/:id`: Delete venue (Admin only)

### Reports (Admin Only)

- `GET /api/reports/events`: Event statistics
- `GET /api/reports/registrations`: Registration statistics
- `GET /api/reports/revenue`: Revenue statistics
