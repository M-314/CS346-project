import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const port = 5000;


app.get('/', (req, res) => {
  console.log('main pagee');
  res.json({
    message: 'Welcome',
  });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

let images = [];

app.post('/api', upload.single('image'),(req, res) => {
    const img = req.file
    console.log(img)
    images.push({
        img        
    })
  res.json({
    images,
  });
});

app.get('/api', (req, res) => {
  console.log('gettt');
  res.json({ images });
});
