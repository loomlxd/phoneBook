# 📒 Phone book

This project is a web application "Phone book", built on React using Supabase as
a backend for storing contacts. The application allows you to add, edit, delete
and view contacts. User authentication is also implemented.

---

## 🚀 Technologies used

- React (Frontend)
- Redux (state and synchronization with URL)
- Redux Persist (saving filter state via persistor)
- React Router (PublicRoute / PrivateRoute)
- Supabase (Backend + DB + authentication)
- CSS / Tailwind (styling, if connected)

---

## ⚙️ Installation and launch

1. Clone the repository:

```
git clone <repository link>
cd <project-name>
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file in the root of the project and add data for Supabase:

```
REACT_APP_SUPABASE_URL=https://<your-project>.supabase.co
REACT_APP_SUPABASE_ANON_KEY=<your-anon-key>
```

4. Run the application:

```
npm start
```

5. There is also a link to the project in the repository description

---

## 🔑 Functionality

- ✅ User registration and login via Supabase
- ✅ Adding a new contact
- ✅ Editing an existing contact
- ✅ Deleting a contact
- ✅ Searching for contacts
- ✅ Saving the selected filter (via Redux Persist)
- ✅ Access delimitation (PublicRoute / PrivateRoute)

---

## 📂 Project structure

- `/src/components` — application components (forms, lists, contact cards)
- `/src/routes` && '/src/views` — routing (PublicRoute / PrivateRoute)
- `/src/redux` — state storage, URL synchronization, filter persistor
- `.env` — environment variables (Supabase keys)

---

## 👨‍💻 Author

Created as a pet project to work with React + Supabase.
