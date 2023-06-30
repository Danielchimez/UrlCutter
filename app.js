const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const database = require('./database');
const auth0Middleware = require('./auth/auth0');
const helmet = require("helmet")
const rateLimit = require("express-rate-limit") 
const app = express();
const PORT = process.env.PORT || 3000;


// Connecting to the database
database.connectingToMongoDB();




app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Auth0 middleware
app.use(auth0Middleware);

//RATE LIMITTING
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15minutes
  max: 100, //limits each IP to 100 requests per window, per 15 minutes
  standardHeaders: true, //return rate limit info in the rateLimit -> headers
  legacyHeaders: false, //disable the x-RateLimit -> headers
})

//Applying rate limitting to all middlewares
app.use(limiter)

//security middleware
app.use(helmet())

app.get('/', requiresAuth(), (req, res) => {
  res.render('index.ejs', { shortenedUrl: null });
});


// Error Handler.
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
