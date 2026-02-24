### 3.1 Authentication

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/auth/register | Public | Register a new user |
| POST | /api/auth/login | Public | Login, returns JWT token |
| POST | /api/auth/logout | Authenticated | Logout user |
| GET | /api/auth/me | Authenticated | Get current user info |

### 3.2 Users

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/users | Admin | List all users |
| GET | /api/users/:id | Admin / Self | Get user by ID |
| PUT | /api/users/:id | Admin / Self | Update user profile |
| DELETE | /api/users/:id | Admin | Delete user |

### 3.3 Events

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/events | Public | List all published events |
| GET | /api/events/:id | Public | Get single event detail |
| POST | /api/events | Organizer | Create a new event |
| PUT | /api/events/:id | Organizer (owner) | Update event |
| DELETE | /api/events/:id | Organizer / Admin | Delete event |

//////////////////////////////////////////////////////////////////

### 3.4 Sessions / Agenda

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/events/:id/sessions | Public | Get all sessions for event |
| POST | /api/events/:id/sessions | Organizer | Add a new session |
| PUT | /api/events/:id/sessions/:sid | Organizer | Update a session |
| DELETE | /api/events/:id/sessions/:sid | Organizer | Delete a session |

### 3.5 Registrations & Tickets

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/events/:id/register | Attendee | Register or buy ticket |
| GET | /api/events/:id/attendees | Organizer | Get attendee list |
| GET | /api/users/:id/tickets | Self | Get my tickets |
| DELETE | /api/registrations/:id | Self | Cancel a registration |

### 3.6 Sponsors

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/events/:id/sponsors | Public | List sponsors for an event |
| POST | /api/events/:id/sponsors | Organizer | Add a sponsorship package |
| PUT | /api/events/:id/sponsors/:sid | Organizer | Update sponsor details |
| DELETE | /api/events/:id/sponsors/:sid | Organizer | Remove a sponsor |
| POST | /api/events/:id/sponsors/:sid/assets | Sponsor | Upload logo or promo assets |

### 3.7 Exhibitors

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/events/:id/exhibitors | Public | List exhibitors for an event |
| POST | /api/events/:id/exhibitors | Organizer | Add an exhibitor |
| PUT | /api/events/:id/exhibitors/:eid | Organizer/Exhibitor | Update booth details |
| DELETE | /api/events/:id/exhibitors/:eid | Organizer | Remove an exhibitor |

### 3.6 Venues

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/venues | Public | List all venues |
| POST | /api/venues | Organizer | Add a new venue |
| PUT | /api/venues/:id | Organizer | Update venue details |
| DELETE | /api/venues/:id | Admin | Delete venue |

### 3.7 Reports

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/reports/events | Admin | Event summary statistics |
| GET | /api/reports/registrations | Admin | Registration counts by event |
| GET | /api/reports/revenue | Admin | Ticket revenue totals |

---
