# Recall Radar

## Project Description
Recall Radar is a food recall tracking web application designed to help users search and monitor public food recall information in a more accessible way. The application uses the openFDA Food Enforcement API to retrieve real-time recall data published by the FDA.

Users can:
- Search recalls by product keyword
- Filter recalls by classification level
- Save recalls to a personal watchlist
- View saved recalls stored in a Supabase database
- Visualize recall classifications using charts

This project was created for INST377 as a full-stack web application using Node.js, Express, Supabase, Fetch API, Chart.js, SweetAlert2, HTML, CSS, and JavaScript.

---

## Target Browsers
The application was tested and designed for the following desktop browsers:
- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

---

## Link to Developer Manual
Detailed developer documentation can be found in:

`docs/developer-manual.md`

---

# Developer Manual

## Introduction
Recall Radar is a full-stack web application that allows users to search and save food recall information using the openFDA API and Supabase.

This document is intended for future developers who may continue development on the project.

---

## Installation Instructions

### 1. Clone Repository
```bash
git clone <repository-url>
```

### 2. Navigate Into Project
```bash
cd inst377-recall-radar
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Create Environment Variables
Create a `.env` file in the root directory.

Add:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

### 5. Start Development Server
```bash
npm start
```

### 6. Open Application
Open:

```text
http://localhost:3000
```

---

## Database Setup

The project uses Supabase as its database provider.

### Required Table
Run the following SQL query inside the Supabase SQL Editor:

```sql
create table saved_recalls (
  id uuid primary key default gen_random_uuid(),
  product_description text,
  reason_for_recall text,
  classification text,
  report_date text,
  created_at timestamp default now()
);
```

---

## API Endpoints

### GET /recalls
Retrieves food recall data from the openFDA Food Enforcement API.

#### Query Parameters
- `keyword`
- `classification`

#### Example
```text
/recalls?keyword=lettuce
```

---

### GET /saved-recalls
Retrieves all saved recalls from the Supabase database.

---

### POST /saved-recalls
Saves a recall into the Supabase database.

#### Expected Request Body
```json
{
  "product_description": "Example Product",
  "reason_for_recall": "Example Reason",
  "classification": "Class I",
  "report_date": "20260517"
}
```

---

## Frontend Functionality

### Home Page
- Search recalls
- Filter recalls
- Save recalls
- Display chart visualization

### About Page
- Explains the purpose of the project
- Describes stakeholders and technologies used

### Watchlist Page
- Displays saved recalls from the database

---

## Libraries Used

### Chart.js
Used to display recall classification chart visualizations.

### SweetAlert2
Used for success notifications when recalls are saved.

---

## Known Bugs
- Duplicate recalls can currently be saved multiple times.
- Mobile responsiveness could be improved.
- Chart updates may overlap after repeated searches.

---

## Future Development Roadmap
Potential future improvements include:
- User authentication
- Email recall alerts
- Export watchlist functionality
- Improved mobile responsiveness
- Additional filtering options
- Advanced recall statistics dashboard

---

## Deployment
The application is deployed using Vercel.

Deployment configuration is handled through:

```text
vercel.json
```

---

## Contributors
- Aastha Gautam