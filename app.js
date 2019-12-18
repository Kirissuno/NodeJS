const express = require('express');
const app = express();
const moment = require('moment');
const voca = require('voca');

app.get('/', (req, res) => {
    res.send("Hola, bienvenido a tu casa")
})

app.get('/saludo', (req, res) => {
    let nombre = req.query.nombre;
    if(nombre){
        res.send(`Hola ${nombre}, bienvenido a codefest`)
    }else{
        res.send(`Bienvenido a codefest`)
    }
})

app.get('/reverse-word', (req, res) =>{
    if(req.query.word && req.query.word.length > 1){
        res.send(`Palabra al revés ` + voca.reverse(req.query.word))
    }else{
        res.send(`Usa el parámetro word para dar la vuelta a palabras`)
    }
})

app.get('/is-lower-case', (req, res) => {
    if(req.query.lower && req.query.lower.length > 0){
        let boleano = voca.isLowerCase(req.query.lower);
        if(boleano){
            res.send("Es minúscula")
        }else{
            res.send("Contiene mayus")
        }
    }
})

app.get('/numDias', (req, res) => {
    if(req.query.fecha && req.query.fecha.length <= 10) {
        const regExFecha = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g;

        if(req.query.fecha.match(regExFecha)) {
            const fechaIntroducida = moment(req.query.fecha);
            const fechaActual = moment();
            const dias = fechaIntroducida.diff(fechaActual, 'days');
            if(dias < 0) {
                res.send(`Han transcurrido ${-dias} días desde la fecha introducida`);
            }
            else {
                res.send(`Faltan ${dias} días para la fecha introducida`);
            }
        }
        else {
            res.send('Debes introducir la fecha con el formato yyyy-mm-dd');
        }
    }
    else{
        res.send('Debes introducir la fecha con el formato yyyy-mm-dd');
    }

});

app.listen(3000, () => {
    console.log('Taller NodeJS + GIT')
})