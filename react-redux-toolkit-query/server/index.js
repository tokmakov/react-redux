import express from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';

const todos = [
    {
        id: uuid(),
        title: 'Первая задача',
        completed: false,
    },
    {
        id: uuid(),
        title: 'Вторая задача',
        completed: true,
    },
    {
        id: uuid(),
        title: 'Третья задача',
        completed: false,
    },
    {
        id: uuid(),
        title: 'Четвертая задача',
        completed: true,
    },
    {
        id: uuid(),
        title: 'Пятая задача',
        completed: false,
    },
];

const delay = (ms) => {
    let current = Date.now();
    const future = current + ms;
    while (current < future) {
        current = Date.now();
    }
};

const app = express();
app.use(cors());
app.use(express.json());

// GET-запрос на получение всего списка
app.get('/api/todo', (req, res) => {
    delay(1000);
    // res.status(404).send();
    // return;
    res.json(todos);
});

// GET-запрос задачи по идентификатору
app.get('/api/todo/:id', (req, res) => {
    delay(1000);
    const todo = todos.find((item) => item.id === req.params.id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).send();
    }
});

// POST-запрос на добавление задачи
app.post('/api/todo', (req, res) => {
    delay(1000);
    const newTodo = {
        id: uuid(),
        title: req.body.title,
        completed: false,
    };
    todos.push(newTodo);
    // возвращаем в ответе новую задачу
    res.json(newTodo);
});

// PUT и PATCH запросы на обновление задачи
const update = (req, res) => {
    delay(1000);
    const id = req.params.id;
    const todo = todos.find((item) => item.id === id);
    if (todo) {
        if (req.body.title !== undefined) todo.title = req.body.title;
        if (req.body.completed !== undefined) todo.completed = req.body.completed;
        // возвращаем в ответе обновленную задачу
        res.json(todo);
    } else {
        res.status(404).send();
    }
};
app.put('/api/todo/:id', update);
app.patch('/api/todo/:id', update);

// DELETE-запрос на удаление задачи
app.delete('/api/todo/:id', (req, res) => {
    delay(1000);
    const index = todos.findIndex((item) => item.id === req.params.id);
    if (index >= 0) {
        const deleted = todos.splice(index, 1);
        // возвращаем в ответе удаленную задачу
        res.json(deleted[0]);
    } else {
        res.status(404).send();
    }
});

app.listen(5000);
