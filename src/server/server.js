
const express= require('express');
const cors = require('cors');




const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
connectDB();
// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true // Allow cookies and credentials
}));


/*Routes*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRouter); 



app.listen(process.env.PORT || 8082, () => {
    console.log(`Server is running on port ${process.env.PORT || 8082}`);
}
);
//app.use(express.json());
