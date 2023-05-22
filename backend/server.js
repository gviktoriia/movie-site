import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';

const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.static('public'));
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: "You are not authenticated"});
    }
    else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is wrong"});
            } 
            else {
                req.name = decoded.name;
                next();
            }
        })
    }
}

app.get('/', verifyUser, (req, res) => {
    db.query(`SELECT email, avatar FROM login WHERE name = ?`, [req.name], (err, results) => {
        if(err) {
            return res.json({Error: 'Database error'});
        } 
        if (results.length === 0) {
            return res.json({Error: 'User not found'});
        }
        const {email, avatar} = results[0];
        return res.json({ Status: 'Success', name: req.name, email, avatar });
    })
})


app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error: "Error for hashing password"});

        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "Inserting data error in server"});
            return res.json({Status: "Success"});
        })
    })
})

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login WHERE email = ?';
    db.query(sql, [req.body.email], (err, data) => {
        if(err) return res.json({Error: "Login error in server"});
        if(data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) return res.json({Error: "Password compare error"});
                if(response) {
                    const name = data[0].name;
                    const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie('token', token);
                    return res.json({Status: "Success"});
                } else {
                    return res.json({Error: "Password doesn't match"});
                }
            })
        } else {
            return res.json({Error: "No email existed"});
        }
    })
})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"})
})

app.post('/upload', verifyUser, upload.single('image'), (req, res) => {
    const image = req.file.filename;
    const name = req.name;
    const sql = "UPDATE login SET avatar = ? WHERE name = ?";
    db.query(sql, [image, name], (err, result) => {
        if(err) return res.json({Error: "Error"});
        return res.json({Status: "Success"});
    })
})

app.post('/save-movie', verifyUser, (req, res) => {
    const { movieId, type } = req.body;
    const name = req.name;    
    const sql = "INSERT INTO saved_movies (`movie_id`, `type`, `user_name`) VALUES (?, ?, ?)";
    db.query(sql, [movieId, type, name], (err, result) => {
      if (err) {
        return res.json({ Error: "Error" });
      }
      return res.json({ Status: "Success" });
    });
});

app.get('/movies', verifyUser, (req, res) => {
    const name = req.name;
    const sql = "SELECT movie_id, type FROM saved_movies WHERE user_name = ?";
    db.query(sql, [name], (err, results) => {
      if (err) {
        return res.json({ Error: "Database error" });
      }
      return res.json({ Status: "Success", data: results });
    });
});
  

app.listen(8081, () => {
    console.log("Listening");
})
