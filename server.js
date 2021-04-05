const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect dataBase
connectDB();

//Init Middeleware

app.use(express.json({ extended: false }));
app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-Width, Content-Type, Accept, Authorisation, X-Auth-Token'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS, PUT'
    );
    next();
})

app.get('/', (req, res) => res.send('API Running'));


app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/user', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
