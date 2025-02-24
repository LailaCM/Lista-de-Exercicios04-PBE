const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const read = async (req, res) => {
    const clientes = await prisma.clientes.findMany();
    return res.json(clientes)
}

const create = async (req, res) => {
    const data = req.body;
    const clientes = await prisma.clientes.create({
        data: data
    });
    return res.status(201).json(clientes).end()
}

const update = async (req, res) => {
    const data = req.body;
    let clientes = await prisma.clientes.update({
        data: data,
        where: {
            id: parseInt(req.params.id)
            }
    })
    return res.status(202).json(clientes).end()
}

const del = async (req, res) => {
    const id = parseInt(req.params.id);
    const clientes = await prisma.clientes.delete({
        where: {
            id: parseInt(req.params.id)
        }
    });
    return res.status(204).json(clientes).end()
}

module.exports = {
    read,
    create,
    update,
    del
}  