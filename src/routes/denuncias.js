const express = require('express')
const prisma = require('../lib/prisma')
const {z} = require('zod')

const router = express.Router()

//Rota para postar denúncias
router.post('/', async (req, res) =>{
    const denunciaSchema = z.object({
        title: z.string(),
        latitude: z.string(),
        longitude: z.string(),
        description: z.string()
    })

    try{
        const {title, latitude, longitude, description} = denunciaSchema.parse(req.body)

        const denuncia = await prisma.denuncia.create({
            data:{
                title,
                latitude,
                longitude,
                description
            }
        })

        res.status(201).send(denuncia)
    }catch (error) {
        res.status(400).json({error: 'Dados inválidos no corpo da solitação'})
    }
})

router.get('/', async (req, res) => {
    try{
        //Buscar todos as denúncias no banco de dados usando o Prisma
        const denuncias = await prisma.denuncia.findMany()

        //Verificar se há denuncias
        if(denuncias.length === 0){
            return res.status(404).json({message:'Nenhuma denúncia encontrada'})
        }
     //Retorna as denúcias como resposta no formato JSON 
     res.json(denuncias) 
    }catch (error){
        res.status(500).json({error:'Erro ao recuperar denúncias'});
    }
})

router.get('/:id', async (req, res) => {
    try{
        const {id} = req.params
        //Buscar 
        const denuncias = await prisma.denuncia.findMany({
            where:{
                id
            }
        })

        //Verificar se há denuncias
        if(denuncias.length === 0){
            return res.status(404).json({message:'Nenhuma denúncia encontrada'})
        }
     //Retorna as denúcias como resposta no formato JSON 
     res.json(denuncias) 
    }catch (error){
        console.error('Erro ao recuperar denúcias:', error);
        res.status(500).json({error:'Erro ao recuperar denúncias'});
    }
})
module.exports = router