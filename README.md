// fullstackProject/
├── client/              # Frontend (UI & Assets)
│   ├── public/          # Static files served to the browser
│   │   ├── css/
│   │   │   └── index.css  # Unified CSS 
│   │   │   └── style.css  # Unified CSS 
│   │   ├── js/
│   │   │   └── main.js    # Unified JS (Toggles, AJAX, Mobile Menu)
│   │   └── images/      # Any logos or icons
│   └── views/           # Pug Templates (Moved from Step 21)
│       ├── dashboard.pug  # Displays Step 20 CRUD data
│       ├── login.pug
│       ├── register.pug
│       ├── profile.pug
│       ├── logout.pug
│       └── layout.pug     # Optional: Base template
│
├── server/              # Backend (Logic & Database)
│   ├── db/              # Database connection logic
│   ├── models/          # User and CRUD Data models
│   ├── routes/          # Express Routers
│   │   ├── auth.js      # Login/Register/Profile logic
│   │   └── crud.js      #  Create/Read/Update/Delete logic
│   ├── .env             # Secrets (PORT, SESSION_SECRET, DB_URL)
│   ├── index.js         # MAIN ENTRY POINT (Configures Pug & Static)
│   └── package.json     # Server dependencies (express, pug, mongoose)
│
├── .gitignore           # Exclude node_modules and .env
└── vercel.json          # Deployment configuration
