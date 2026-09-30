# Project Notes

### 1. Multi-User Support
I would add a `userId` reference field to the Task schema with an index and create a User model for authentication. On the API side, I'd attach JWT auth middleware so endpoints automatically filter queries by `req.user.id`, ensuring users can only read and mutate their own tasks.

### 2. Scaling to Thousands of Items
The immediate concern would be network payload size and DOM rendering lag from fetching all tasks at once. I would add server-side pagination (e.g., `?page=1&limit=20`) backed by a database index on `{ status: 1, createdAt: -1 }`, and use virtual scrolling on the frontend to keep the DOM light.

### 3. AI Tool Usage & Refinement
Yes, an AI tool initially suggested exporting multiple components together as an object (`export default { TaskList, TaskItem }`). I changed this because importing an object as a default React component broke the JSX render in `App.js`, so I switched it back to exporting `TaskList` directly as the default component function.
