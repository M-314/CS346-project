import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 5000;

app.get('/', (req, res) => {
  console.log('main pagee');
  res.json({
    message: 'Welcome',
  });
});

let images = [];

app.post('/api', upload.single('image'), (req, res) => {
  // TODO send image to db
  const img = req.file;
  console.log(img);
  images.push({
    img,
  });
  res.json({
    images,
  });
});

let Users = [];

app.post('/users', (req, res) => {
  // TODO hash user password
  // Validate inputs
  // send it to db
  const user = req.body;
  Users.push(user);
  res.json(Users);
});

app.post('/users/login', (req, res) => {
  // TODO verify password
  const user = req.body;
  const neededUser = Users.filter((u) => user.username === u.username);
  if (neededUser[0].password === user.password)
    res.json({
      message: `Welcome ${user.username}`,
      neededUser
    });
  else
    res.json({
      message: 'Wrong username or password',
    });
});

app.get('/api', (req, res) => {
  // TODO gets images from db
  console.log('gettt');
  res.json({ images });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
