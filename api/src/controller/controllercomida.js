const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    const comida = await prisma.comida.findMany();
    return res.json(comida)
}

const create = async (req, res) => {
    const data = req.body;
    const comida = await prisma.comida.create({
        data: data
    });
    return res.status(201).json(comida).end()
}

const update = async (req, res) => {
    const data = req.body;
    let comida = await prisma.comida.update({
    where: {
        id: parseInt(req.params.id)
    },
    data: data
});
    return res.status(202).json(comida).end()
}

const del = async (req, res) => {
    const id = parseInt(req.params.id);
    const comida = await prisma.comida.delete({
        where: {
            id: parseInt(req.params.id)
        }
    });
    return res.status(204).json(comida).end()
}


module.exports = {
    read,
    create,
    update,
    del
}  