import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import weatherRouter from './weather.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files from the public folder BEFORE route definitions
app.use(express.static(path.join(__dirname, 'public')));

// Mount the weather router at /api/weather
app.use('/api/weather', weatherRouter);

// GET /api/info route
// app.get('/api/info',(req,res)=>{
//     res.json({name:"Weather service API"});
// });

app.get('/api/info', (req, res) => {
    //   res.json({ name: 'Weather Service API' });
    res.json({
        name: 'Weather Service API',
        version: '1.0.0',
        endpoints: ['/api/weather/:city', '/api/greet/:name', '/api/data'],
    });
});

app.get('/', (req, res) => {
    // res.send('Welcom to the weather API!');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.get('/api/status',(req,res)=>{
//     res.status(200).json({status:'OK'});
// });
app.get('/api/status', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// GET /docs route
app.get('/docs', (req, res) => {
    res.redirect('/api/info');
});

// GET /api/greet/:name route
app.get('/api/greet/:name', (req, res) => {
    const { name } = req.params;
    res.json({ message: `Hello, ${name}!` });
});

// Chained route using app.route()
app.route('/api/data')
    .get((req, res) => {
        res.json({ message: 'Data fetched successfully' });
    })
    .post((req, res) => {
        res.status(201).json({ status: 'ok' });
    });

app.listen(PORT, () => {
    console.log("server is listening at port 3000")
});