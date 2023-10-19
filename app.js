import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';
import bodyParser from 'body-parser';
import gcgRoutes from './routes/gcg';
import path from 'path';
import engine from 'express-handlebars';
import numero from './models/numero.js'; // Import your Mongoose model

const app = express();

// CONFIGURAÇÕES
// SESSÃO
app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

// MIDDLEWARE
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

// CONFIGURAÇÕES
// BODY PARSER
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// HANDLEBARS
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");

// MONGOOSE
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://mestregcg:0w2xuU8WLSRVDozs@teste.mqkrsbm.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("Connected to MongoDB...");
}).catch((err) => {
    console.error("Error connecting to MongoDB: " + err);
});

// PUBLIC
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use('/adv', gcgRoutes);

app.get('/', async (req, res) => {
    try {
        const listan = await numero.find(); // Use the 'numeroModel' to query your data
        res.render("index");
    } catch (err) {
        console.error("Error fetching data: " + err);
        res.status(500).send("Internal Server Error");
    }
});

// OTHER
const port = 8081;
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
