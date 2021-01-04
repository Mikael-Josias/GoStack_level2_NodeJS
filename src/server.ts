import express from 'express';

const app = express();

app.get('/', (require, response) => {
    return response.json({message: 'Hello World!'});
});

app.listen(3333, () => {
     console.log('server started on port 3333');
});