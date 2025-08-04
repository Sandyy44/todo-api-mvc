const express = require('express')
const app = express()
const fs = require('fs');
const mongoose = require('mongoose')
const port = 4588;

const usersRoutes = require('./Routes/users.routes')
const todosRoutes = require('./Routes/todos.routes');
app.use(express.json())
app.use('/users', usersRoutes)
app.use('/todos', todosRoutes)

mongoose.connect('mongodb://127.0.0.1:27017/todosDB').then(() => {
  console.log("Connected successfully to todosDB database")
}).catch((error) => {
  console.log("Faild connecting to todoDB database")
})

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})