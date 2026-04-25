const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise')();
const multer = require('multer');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'blog',
  user: 'postgres',
  password: 'admin',
  allowExitOnIdle: true
});

const app = express();

/* CORS config */
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

/* Multer config */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/assets/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

/* SESSION config */
app.use(session({
  store: new pgSession({
    pgPromise: db
  }),
  secret: 'hola',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10 * 60 * 1000, secure: false }
}));

/* Auth middleware */
const authenticateSession = (req, res, next) => {
  if (req.session.id_author) {
    next();
  } else {
    res.sendStatus(401);
  }
};

/* GET all posts */
app.get('/posts', async (req, res) => {
  const posts = await db.any('SELECT * FROM post');
  res.json(posts);
});

/* GET single post */
app.get('/posts/:id_post', async (req, res) => {
  const post = await db.one('SELECT * FROM post WHERE id_post = $1', [req.params.id_post]);
  res.json(post);
});

/* POST new post */
app.post('/posts/new', upload.single('img'), async (req, res) => {
  const { title, date, text } = req.body;
  const img = req.file ? `/src/assets/uploads/${req.file.originalname}` : null;
  await db.none(
    'INSERT INTO post (title, date, image, text) VALUES ($1, $2, $3, $4)',
    [title, date, img, text]
  );
  res.json({ message: 'Post created successfully' });
});

/* GET author — protected route */
app.get('/author/:id_author', authenticateSession, async (req, res) => {
  const author = await db.one('SELECT * FROM author WHERE id_author = $1', [req.params.id_author]);
  res.json(author);
});

/* POST login */
app.post('/login', upload.none(), (req, res) => {
  const { username, password } = req.body;
  db.oneOrNone('SELECT * FROM author WHERE username = $1', [username])
    .then((data) => {
      if (data != null) {
        if (data.password == password) {
          req.session.id_author = data.id_author;
          req.session.save(function (err) {
            if (err) return next(err);
          });
          res.send(req.session);
        } else {
          res.status(401).send('Invalid email/password');
        }
      } else {
        res.status(401).send('Invalid credentials');
      }
    })
    .catch((error) => console.log('ERROR: ', error));
});

/* GET session info */
app.get('/session-info', (req, res) => {
  res.json(req.session);
});

/* GET logout */
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Failed to destroy session');
    res.send('Session destroyed');
  });
});

app.listen(8000, () => console.log('Server running on port 8000'));