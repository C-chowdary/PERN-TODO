import express from "express";
import cors from "cors";
import pg from "pg";
import env from "dotenv";

const app = express();
env.config();
const port = process.env.PORT;

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
db.connect();

app.use(cors());
app.use(express.json());

//Routes//

//Create a todo
app.post("/todos", async (req,res) => {
    try {
       const {description} = req.body;
       const newtodo = await db.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description]);
       res.json(newtodo.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
});

//Get all todo's

app.get("/todos", async (req,res)=>{
    try {
        const allTodos = await db.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.error(err.message);        
    }
});

//Get a todo

app.get("/todos/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const todo = await db.query("SELECT * FROM todo WHERE tid=$1",[id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(err.message);
    }
});

//Update a todo

app.put("/todos/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const {description} = req.body;
        const Updatetodo = await db.query("UPDATE todo SET description = $1 WHERE tid = $2",[description,id]);
        res.json("the todo is updated!!");
    } catch (error) {
        console.error(err.message);
    }
});

//Delete a todo
app.delete("/todos/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const deletetodo = await db.query("DELETE FROM todo WHERE tid=$1",[id]);
        res.json("todo got deleted");
    } catch (error) {
        console.error(err.message);
    }
});



app.listen(port,()=>{
    console.log(`App is running on port ${port}`);
})