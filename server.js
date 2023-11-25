require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./app/models');

const server = express();

var corsConfig = {
    origin: 'http://localhost:8081' //puerto cliente
};

server.use(cors(corsConfig));
server.use(express.json()); //Leer peticiones de tipo JSON
server.use(express.urlencoded({ extended: true })); //Lerr peticiones de tipo Form

const Role = db.role;

db.sequelize.sync({ force: true })
    .then(() => {
        console.log('Drop and Resync DB');
        initializeRoles();
    });

function initializeRoles() {
    Role.create({
        id: 1,
        name: 'user'
    });

    Role.create({
        id: 2,
        name: 'moderator'
    });

    Role.create({
        id: 3,
        name: 'admin'
    });
}

server.get('/', (req, res) => {
    res.json({ message: 'Mi primera ruta' });
});

const PORT = process.env.PORT || 8082;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});