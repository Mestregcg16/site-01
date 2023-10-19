const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const numero = require("../models/numero.js")
const Categoria = mongoose.model('categorias')


router.get('/', async (req, res) => {
    res.render("gcg/index")
})

router.get('/rifa', (req, res) => {
    res.send("my gcg rifa")
})

router.get('/sorteio', (req, res) => {
    res.send("my gcg sorteio")
})

router.get('/add', (req, res) => {
    var erros = []
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({Text: "nome invalido"})
    }
    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "slug invalido"})
    }
    if(req.body.nome.length < 2){
        erros.push({texto: "nome da categoria muito pequeno"})
    }
    if(erros.length > 0){
        res.render("gcg/addn", {erros: erros})
    }else{
        const nc = {
            nome: req.body.nome,
            slug: req.body.slug
        }
    
        new Categoria(nc).save().then(() => {
            req.flash("success_msg", "deu bom visse fi")
            res.redirect("/gcg/rife")
        }).catch((err) => {
            req.flash("error_msg", "deu merda visse fi")
            res.redirect("/gcg")
        })
    }


   
})




module.exports = router