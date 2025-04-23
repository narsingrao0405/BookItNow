
const express= require('express');
const cors = require('cors');
const auth = require('./middlewares/authMiddleware');




const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const movieRouter = require('./routes/movieRoute');
const middlewareWrapper = require('cors');
connectDB();
// Enable CORS
app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true // Allow cookies and credentials
}));


/*Routes*/
//app.use(middlewareWrapper);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', userRouter); 
app.use('/api/movies', movieRouter)
app.use(auth);




app.listen(process.env.PORT || 8082, () => {
    console.log(`Server is running on port ${process.env.PORT || 8082}`);
}
);
//app.use(express.json());
