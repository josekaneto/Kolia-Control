const hospedes = require('../models/hospedeData');

module.exports = {
    async create (req, res){
        const { 
            nome,
            email,
            telefone,
            estado,
            cidade,
            endereco,
            cep,
            cpf,
            rgNumero,
            numeroReserva,
            hotel,
        } = req.body;

        if(!nome){
            return res.status(400).json({ error: "Insira seu nome!"})
        }
        else if(!email || !telefone){
            return res.status(400).json({ error: "Informações de contato faltando!"})
        }
        else if(!estado || !cidade || !endereco || !cep){
            return res.status(400).json({ error: "Informações de residencia faltando!"})
        }
        else if(!cpf || !rgNumero){
            return res.status(400).json({ error: "Informações pessoais faltando!"})
        }

        const hospedeCreated = await hospedes.create({
            nome,
            email,
            telefone,
            estado,
            cidade,
            endereco,
            cep,
            cpf,
            rgNumero,
            numeroReserva,
            hotel,
        });

        return res.json(hospedeCreated);
    }
}