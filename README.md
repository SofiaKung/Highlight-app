

# Highlight-app 
An e-book highlight organiser, upload your highlights from ebooks to keep your highlights in one place for easy access and review. The app is created with Next.js and MongoDB, deployed with Vercel.

## Introduction 
I created this app to better organise my e-book highlights from the Libby app. Deployed app is available at https://highlight-app.vercel.app

## Features
In this app, you can: 
- Upload ebook highlights in CSV format 
- Edit highlights and notes 
- Delete a highlights 
- Favorite a highlight 
- Add tags to organise your highlights


## Key learnings: 
- Learnt to use Whimsical to design the layout of the web app 
- Learnt to use various Next.js built in functions 
- Learnt to use ServerSideProps and Async/Await to fetch data from DB 
- Learnt to connect to MongoDB, perform CRUD operations with Next.js api-routes 
- Learnt to create environment variables 

## Status
The project is still under development, I plan to add a section in the sidebar to display existing tags and pages to display highlights filtered by a tag. 

## To do 
- Display tags on sidebar 
- Create dynamic pages to display highlights with a tag
- Search for tags 
- Add animation upon hovering a tag 

## Developer

After cloning, run: 


```bash
npm install

```


To run the development server:

```bash
npm run dev

```


To connect to your own Mongo DB: 

Go to MongoDB Altas official page to sign up for an account: 
1. Create a free cluster 
2. Create a user with read and write rights 
3. Add 0.0.0.0/0 IP in Network Access setting


Create a `.env.local` file in your root directory:

```
MONGO_DB_USER=your_username
MONGO_DB_PASS=your_password
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


