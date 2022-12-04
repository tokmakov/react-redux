import express from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';

const postIdOne = uuid();
const postIdTwo = uuid();
const postIdThree = uuid();

const userIdOne = uuid();
const userIdTwo = uuid();
const userIdThree = uuid();

const tagIdOne = uuid();
const tagIdTwo = uuid();
const tagIdThree = uuid();

const posts = [
    {
        id: postIdOne,
        title: 'Первый пост блога',
        author: { id: userIdOne, name: 'Сергей Иванов' },
        tags: [
            { id: tagIdOne, name: 'Первая метка' },
            { id: tagIdTwo, name: 'Вторая метка' },
        ],
    },
    {
        id: postIdTwo,
        title: 'Второй пост блога',
        author: { id: userIdTwo, name: 'Николай Петров' },
        tags: [
            { id: tagIdOne, name: 'Первая метка' },
            { id: tagIdThree, name: 'Третья метка' },
        ],
    },
    {
        id: postIdThree,
        title: 'Третий пост блога',
        author: { id: userIdThree, name: 'Андрей Смирнов' },
        tags: [
            { id: tagIdTwo, name: 'Вторая метка' },
            { id: tagIdThree, name: 'Третья метка' },
        ],
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

// GET-запрос на получение списка постов
app.get('/api/blog', (req, res) => {
    delay(1000);
    res.json(posts);
});

// GET-запрос поста по идентификатору
app.get('/api/blog/:id', (req, res) => {
    delay(1000);
    const post = posts.find((item) => item.id === req.params.id);
    if (post) {
        res.json(post);
    } else {
        res.status(404).send();
    }
});

// POST-запрос на добавление поста блога
app.post('/api/blog', (req, res) => {
    delay(1000);
    const newPost = {
        id: uuid(),
        title: req.body.title,
        author: req.body.author,
        tags: req.body.tags,
    };
    posts.push(newPost);
    // возвращаем в ответе новый пост
    res.json(newPost);
});

// PUT и PATCH запросы на обновление поста
const update = (req, res) => {
    delay(1000);
    const id = req.params.id;
    const post = posts.find((item) => item.id === id);
    if (post) {
        if (req.body.title !== undefined) post.title = req.body.title;
        if (req.body.author !== undefined) post.author = req.body.author;
        if (req.body.tags !== undefined) post.tags = req.body.tags;
        // возвращаем в ответе обновленный пост
        res.json(post);
    } else {
        res.status(404).send();
    }
};
app.put('/api/blog/:id', update);
app.patch('/api/blog/:id', update);

// DELETE-запрос на удаление поста блога
app.delete('/api/blog/:id', (req, res) => {
    delay(1000);
    const index = posts.findIndex((item) => item.id === req.params.id);
    if (index >= 0) {
        const deleted = posts.splice(index, 1);
        // возвращаем в ответе удаленный пост
        res.json(deleted[0]);
    } else {
        res.status(404).send();
    }
});

app.listen(5000);
