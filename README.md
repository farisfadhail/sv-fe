# Blog Dashboard Frontend (Next.js + Shadcn/UI)

This project is a simple frontend dashboard for managing and displaying blog articles.
Built using Next.js (App Router) and shadcn/ui for a modern and responsive interface.

---

## Main Features

- Display article list in a table format.
- Edit article feature.
- Update article status to “Thrash.”
- Preview page to display articles with Publish status.
- Pagination with limit and offset parameters.
- Elegant design using shadcn/ui and Tailwind CSS.

---

## Technologies Used

- **Next.js 14 (App Router)**
- **React 18**
- **shadcn/ui**
- **Tailwind CSS**
- **Lucide React Icons**

---

## Folder Structure

```
src/
 ├── app/
 │   ├── layout.js              # Main layout
 │   ├── page.js                # Main dashboard (article table)
 │   ├── posts/
 │   │   ├── page.js            # Article index page
 │   │   ├── add/page.js        # Add new article page
 │   │   ├── edit/[id]/page.js  # Edit article page
 │   ├── preview/page.js        # Preview published articles page
 │   └── globals.css            # Global styling
 ├── components/
 │   ├── datatable.js           # Table column configuration
 │   ├── ui/                    # Components from shadcn/ui
 ├── lib/
 │   └── api.js                 # External API configuration
 └── README.md
```

---

## How to Run

1. **Clone repository**
   ```bash
   git clone https://github.com/farisfadhail/sv-fe.git
   cd sv-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the project**
   ```bash
   npm run dev
   ```

4. Open in your browser
   [http://localhost:3000](http://localhost:3000)

---

## Main Components

| Component               | Description                                |
| ----------------------- | ------------------------------------------ |
| **DataTable**           | Displays article data with pagination      |
| **Button (shadcn)**     | Used for edit & thrash actions             |
| **PreviewCard**         | Displays published articles in full layout |
| **Pagination Controls** | Manages data navigation between pages      |


---

## Example Backend API Endpoints

Although this project is frontend-only, below are examples of API endpoints consumed:

| Endpoint                     | Method | Description                            |
| ---------------------------- | ------ | -------------------------------------- |
| `/article?limit=10&offset=0` | GET    | Retrieve article list                  |
| `/article`                   | POST   | Create article                         |
| `/article/:id`               | GET    | Retrieve article details               |
| `/article/:id`               | PUT    | Update article (e.g., set to `thrash`) |


---

## Screenshots

### Dashboard
Displays a list of articles with edit and thrash actions.

### Preview
Displays published articles in a full-width layout.
