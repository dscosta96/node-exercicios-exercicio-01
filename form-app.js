http = require('http'); // Importa modulo nativo do Node
const fs = require('fs'); 
const url = require('url');

var server = http.createServer(function (req, res) {

    if (req.url == "/listar"){
        fs.readFile('cadastro.txt', function (err, data) { 
            if (err) throw err; //caso haja e rro
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write(data);
        res.end();
    });

    }else  if ( req.url=='/inicio'){
        fs.readFile('inicio.html',( err,data)=>{
          if (err) throw err; //caso haja e rro
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.write(data);
          res.end();
    });
    
    }else if (req.url == "/ajuda"){
        fs.readFile('ajuda.html', function (err, data) { 
            if (err) throw err; //caso haja e rro
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write(data);
        res.end();
    });

    }else if (req.url == '/') {

        fs.readFile('form.html', function(err, data){ 
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'}); 
            res.write(data); 
            res.end();
        }); 
    }else{ 
        const q = url.parse(req.url, true); 
        const nome = q.query.nome; 
        const email = q.query.email;

        const  conteudo  =  `nome: ${nome} => email: ${email} \n`;
        fs.appendFile('cadastro.txt',conteudo, function (err) {
            if (err) throw err;
            //console.log('Salvo!');
        });

        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'})

        const resposta =
        `<html>
           <head> 
           <title> Resposta Formulário </title>
           </head> 
           <body> 
             <h1>Olá ${nome} </h1> 
             <h2> Confirme seus dados:</h2> 
             <p> Seu nome: ${nome} </p> 
             <p> Seu email: ${email} </p> 
           </body>
        <html>`;

        res.write(resposta);
        res.end(); 
    }
    
});

server.listen(3000);
console.log('Servidor rodando na porta 3000');