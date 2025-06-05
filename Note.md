## Video calling interview

1. create next js app

- npx create-next-app@latest

2. Setup for shadecn

- npx shadcn@latest init

3. Install shade con component

- npx shadcn@latest add button card

4. SetUp for clerk

- npm install @clerk/nextjs

5. setup for convex

- npm i convex

6. run convex for backend

- npx convex dev

7. Get Stream setup for video call

- npm install @stream-io/video-react-sdk
- npm install @stream-io/node-sdk

8. authentication setup in convex with clerk

- https://docs.convex.dev/auth/clerk

9. create webhook in clerk

- https://different-kingfisher-486.convex.site/clerk-webhook
- created user.ts and http.js also setup svix webhook to send registerd user data to the convex

10. create all schema, mutation and query

- schema has been created
- along with users.ts, interview.ts and comments.ts are created and write query there

11. create darkmode and light mode toggle

- go to shad cn website
- search for dar mode
- install next theme - npm install next-themes
- create theme provider
- import theme provider in layout.tsx
- create mode toggle compont in ui folder
- install dropdown- menu from shade cn
- import mode toggle in navbar
