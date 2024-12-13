const express = require("express");
const app = express();
const userRoutes= require('./router/userRouter')
const connectDB = require("./config/db");
const Patient = require("./models/user");
const productRoutes = require("./router/productRouter")
const authRoutes = require('./router/authRouter');
connectDB();

app.use(express.json())
app.use("/patient",userRoutes)
app.use('/', authRoutes);
app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use('/api/products', productRoutes);
app.use(express.json());

// Start the server
const PORT = 5003;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});


