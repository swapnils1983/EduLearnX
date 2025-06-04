const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => { console.log(err) });


//routes
app.use('/auth', require('./routes/authRoutes'))
app.use("/media", require('./routes/mediaRoutes'));
app.use("/instructor/course", require('./routes/courceRoutes'));
app.use("/student/course", require('./routes/studentCourceRoutes'));
app.use("/student/order", require('./routes/orderRoute'));
app.use("/progress", require("./routes/progressRoutes"))
app.use("/recomendation", require("./routes/recommendationRoutes"))


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});