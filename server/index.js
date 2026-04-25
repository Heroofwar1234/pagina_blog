const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise')();
const multer = require('multer');
const path = require('path');

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

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/assets/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

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

// GET author
app.get('/author/:id_author', async (req, res) => {
  const author = await db.one('SELECT * FROM author WHERE id_author = $1', [req.params.id_author]);
  res.json(author);
});

// POST new post
app.post('/posts/new', upload.single('img'), async (req, res) => {
  const { title, date, text } = req.body;
  const img = req.file ? `/src/assets/uploads/${req.file.originalname}` : null;
  await db.none(
    'INSERT INTO post (title, date, image, text) VALUES ($1, $2, $3, $4)',
    [title, date, img, text]
  );
  res.json({ message: 'Post created successfully' });
});

app.listen(8000, () => console.log('Server running on port 8000'));