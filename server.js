const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const UsersRoute = require('./routes/api/users');
const CottageRoute = require('./routes/api/cottage');
const ReservationRoute = require('./routes/api/reservation');
const AuthRoute = require('./routes/api/auth');
require('./services/passport');

const app = express();

// Connect to Mongo
mongoose
  .connect(keys.mongoURI, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Load Admin Account
require('./seed');

// Use Routes
app.use('/api/users', UsersRoute);
app.use('/api/cottage', CottageRoute);
app.use('/api/reservation', ReservationRoute);
app.use('/', AuthRoute);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
