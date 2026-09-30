# Project Notes

### 1. Multi-User Support
I would add a `userId` reference field to the Task schema with an index and create a User model for authentication. On the API side, I'd attach JWT auth middleware so endpoints automatically filter queries by `req.user.id`, ensuring users can only read and mutate their own tasks.

### 2. Scaling to Thousands of Items
The immediate concern would be network payload size and DOM rendering lag from fetching all tasks at once. I would add server-side pagination (e.g., `?page=1&limit=20`) backed by a database index on `{ status: 1, createdAt: -1 }`, and use virtual scrolling on the frontend to keep the DOM light.

### 3. AI Tool Usage & Refinement
Being honest, i have only used AI for one of error fixing which was axios related code in `App.js` file i was getting error of 404 on API call and using AI tool i was able to fix that error and the code worked as expected.
