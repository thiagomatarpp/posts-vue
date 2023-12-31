import express from 'express'
import cors from 'cors'
import {Post, thisMonth, thisWeek, today} from '../post';
import bodyParser from "body-parser";
import {NewUser, User} from "../users.ts";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const allPosts = [today, thisWeek, thisMonth];
const allUsers: User[] = [];

app.get("/posts", (req, res) => {
    console.log(req, res)
    res.json(allPosts);
});


app.post<{}, {}, Post>("/posts", (req, res) => {
    const post = { ...req.body, id: (Math.random() * 100000).toFixed() };
    allPosts.push(post);
    res.json(post);
});

app.post<{}, {}, NewUser>("/users", (req, res) => {
    const user = { ...req.body, id: (Math.random() * 100000).toFixed() };
    allUsers.push(user);
    const {password, ...rest} = user;
    res.json(rest);
});

async function start() {
    const port: number = 7600
    app.listen(port, () => {
        console.log(`Listening on  http://localhost:${port}`);
    });
}

start()