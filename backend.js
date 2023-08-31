const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.post('/receber-dados', (req, res) => {
  const temperatura = req.body.temperatura;
  const umidade = req.body.umidade;

  // Salvar temperatura em arquivo de log
  fs.appendFile('temperatura.log', temperatura + '\n', (err) => {
    if (err) {
      console.error('Erro ao salvar temperatura:', err);
      res.status(500).send('Erro ao salvar temperatura');
    } else {
      console.log('Temperatura salva com sucesso');
      res.status(200).send('Temperatura salva com sucesso');
    }
  });

  // Salvar umidade em arquivo de log
  fs.appendFile('umidade.log', umidade + '\n', (err) => {
    if (err) {
      console.error('Erro ao salvar umidade:', err);
    } else {
      console.log('Umidade salva com sucesso');
    }
  });
});

app.get('/temperatura', (req, res) => {
  fs.readFile('temperatura.log', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo temperatura.log:', err);
      res.status(500).send('Erro ao ler o arquivo temperatura.log');
    } else {
      // Separa as linhas do arquivo em um array
      const linhas = data.trim().split('\n');
      // Obtém o último valor
      const ultimoValor = linhas[linhas.length - 1];
      res.send(ultimoValor);
    }
  });
});

app.post('/setmaxtemp', (req, res) => {
  const value = req.body.value; // Acessar diretamente o valor da propriedade "value"

  // Armazena o valor em um arquivo 'maxtemp.log'
  fs.writeFile('maxtemp.log', value, (err) => {
    if (err) {
      console.error('Erro ao escrever no arquivo maxtemp.log:', err);
      return res.status(500).send('Erro ao definir a temperatura máxima');
    }
    console.log('Temperatura máxima definida:', value);
    return res.status(200).send('Temperatura máxima definida com sucesso');
  });
});

app.post('/setmintemp', (req, res) => {
  const value = req.body.value; // Acessar diretamente o valor da propriedade "value"

  // Armazena o valor em um arquivo 'maxtemp.log'
  fs.writeFile('mintemp.log', value, (err) => {
    if (err) {
      console.error('Erro ao escrever no arquivo mintemp.log:', err);
      return res.status(500).send('Erro ao definir a temperatura máxima');
    }
    console.log('Temperatura mínima definida:', value);
    return res.status(200).send('Temperatura máxima definida com sucesso');
  });
});

app.get('/maxtemp', (req, res) => {
  fs.readFile('maxtemp.log', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo maxtemp.log:', err);
      return res.status(500).send('Erro ao ler a temperatura máxima');
    }
    console.log('Conteúdo do arquivo maxtemp.log:', data);
    return res.status(200).send(data);
  });
});

app.get('/mintemp', (req, res) => {
  fs.readFile('mintemp.log', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo mintemp.log:', err);
      return res.status(500).send('Erro ao ler a temperatura máxima');
    }
    console.log('Conteúdo do arquivo mintemp.log:', data);
    return res.status(200).send(data);
  });
});



app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

