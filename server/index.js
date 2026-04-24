const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise')();


const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'blog',
  user: 'postgres',
  password: 'admin',
  allowExitOnIdle: true
});

const app = express();
app.use(cors());
app.use(express.json());

// GET all posts
app.get('/posts', async (req, res) => {
  const posts = await db.any('SELECT * FROM post');
  res.json(posts);
});

// GET single post
app.get('/posts/:id_post', async (req, res) => {
  const post = await db.one('SELECT * FROM post WHERE id_post = $1', [req.params.id_post]);
  res.json(post);
});

app.listen(8000, () => console.log('Server running on port 8000'));
