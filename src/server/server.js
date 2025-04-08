const express= require('express');

const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
connectDB();
/*Routes*/
app.use('/api/users', userRouter); 

app.listen(process.env.PORT || 8082, () => {
    console.log(`Server is running on port ${process.env.PORT || 8082}`);
}
);
app.use(express.json());
