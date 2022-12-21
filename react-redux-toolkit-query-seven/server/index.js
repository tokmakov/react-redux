import express from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';

const todos = [
    {
        id: uuid(),
        title: 'Первая задача',
        content: 'Описание первой задачи',
        completed: false,
    },
    {
        id: uuid(),
        title: 'Вторая задача',
        content: 'Описание второй задачи',
        completed: true,
    },
    {
        id: uuid(),
        title: 'Третья задача',
        content: 'Описание третьей задачи',
        completed: false,
    },
    {
        id: uuid(),
        title: 'Четвертая задача',
        content: 'Описание четвертой задачи',
        completed: true,
    },
    {
        id: uuid(),
        title: 'Пятая задача',
        content: 'Описание пятой задачи',
        completed: false,
    },
    {
        id: uuid(),
        title: 'Шестая задача',
        content: 'Описание шестой задачи',
        completed: true,
    },
    {
        id: uuid(),
        title: 'Седьмая задача',
        content: 'Описание седьмой задачи',
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

const PAGE_SIZE = 3;

const app = express();
app.use(cors());
app.use(express.json());

// GET-запрос на получение всего списка
app.get('/api/todo', (req, res) => {
    delay(1000);
    const page = req.query.page && /^\d+$/.test(req.query.page) ? parseInt(req.query.page) : 1;
    const pages = todos.length > 0 ? Math.ceil(todos.length / PAGE_SIZE) : 1;
    if (page <= pages) {
        const start = (page - 1) * PAGE_SIZE;
        const slice = todos.slice(start, start + PAGE_SIZE);
        const short = slice.map(({ content, ...rest }) => rest);
        res.json(short);
    } else {
        res.status(404).send();
    }
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
        content: req.body.content,
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
        if (req.body.content !== undefined) todo.content = req.body.content;
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
