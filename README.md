# Projeto Final: Sistema Embarcado com Backend e Aplicativo Móvel

Este repositório contém um projeto que combina um sistema embarcado, um backend de microservices e um aplicativo móvel. Cada componente desempenha um papel fundamental no projeto, contribuindo para a criação de um sistema completo de medição, controle e monitoramento.

## Embarcado

![ESP](http://www.lulinucs.com.br/imgs_prjfinalembarcados/esp.jpg)

O sistema embarcado, operacionalizado através de um ESP8266, apresenta uma estrutura simples, incorporando um conjunto de dispositivos essenciais: um sensor de temperatura DHT11, um LED RGB e um display OLED. Sua funcionalidade central consiste em monitorar ativamente as condições ambientais e responder de acordo.

O sensor DHT11 é empregado com precisão para medir os níveis de temperatura e umidade no ambiente circundante. Os dados coletados são então exibidos no display OLED, proporcionando uma visualização imediata das leituras.

Um aspecto destacado é a capacidade de configuração personalizada. Essa funcionalidade permite aos usuários definirem valores máximos e mínimos para as leituras de temperatura e umidade. Vale ressaltar que esse processo de configuração ocorre por meio do aplicativo móvel dedicado, que ajusta os parâmetros conforme as preferências. O sistema embarcado, por sua vez, extrai essas configurações do backend e opera de acordo com as diretrizes recebidas.

Adicionalmente, o sistema integra um LED RGB que desempenha um papel fundamental. Se a temperatura lida ultrapassar o limite configurado como temperatura máxima pelo aplicativo móvel, o LED RGB é automaticamente acionado para exibir a cor vermelha. Da mesma forma, se a temperatura cair abaixo do limite configurado como temperatura mínima no aplicativo, o LED RGB adquire a cor azul correspondente.

Em resumo, o sistema embarcado, apoiado pelo ESP8266, consiste em dispositivos chave como o sensor de temperatura DHT11, o LED RGB e o display OLED. Sua funcionalidade é centrada na coleta de dados ambientais, sua exibição, a possibilidade de personalização por meio do aplicativo móvel e a capacidade de resposta do LED RGB com base nas configurações estabelecidas.

![Console ESP](http://www.lulinucs.com.br/imgs_prjfinalembarcados/consoleESP.png)

## Backend

![Console Backend](http://www.lulinucs.com.br/imgs_prjfinalembarcados/consoleBackend.png)

O backend é construído utilizando Node.js e Express, fornecendo a infraestrutura para armazenar, recuperar e configurar os dados do sistema embarcado. Ele é responsável por lidar com as requisições do sistema embarcado e do aplicativo móvel. As funcionalidades principais do backend incluem:

- Recebimento dos dados de temperatura e umidade enviados pelo sistema embarcado.
- Armazenamento das leituras em arquivos de log.
- Fornecimento das leituras mais recentes ao aplicativo móvel.
- Fornecimento das configurações de temperatura máxima e mínima ao sistema embarcado e ao aplicativo móvel.

## Aplicativo Móvel

![App](http://www.lulinucs.com.br/imgs_prjfinalembarcados/app.jpeg)

O aplicativo móvel é desenvolvido em React Native e atua como uma interface de controle e monitoramento para o sistema embarcado. Ele permite configurar as temperaturas máxima e mínima, bem como visualizar as leituras atuais. As funcionalidades principais do aplicativo móvel são:

- Exibição da temperatura atual, obtida do backend.
- Configuração da temperatura máxima permitida.
- Configuração da temperatura mínima permitida.
- Visualização das leituras de temperatura e umidade enviadas pelo sistema embarcado.

O aplicativo móvel facilita a interação com o sistema embarcado, permitindo que o usuário personalize as configurações e visualize as condições ambientais em tempo real.

## Como Executar

### Backend

1.  Certifique-se de ter o Node.js instalado em seu sistema.
    
2.  Abra o terminal na pasta do backend.
    
3.  Execute o seguinte comando para instalar as bibliotecas necessárias:    
    `npm install` 
    
4.  Após a instalação das bibliotecas, execute o backend com o comando:       
    `node backend.js` 
    

### App

1.  Certifique-se de ter o Node.js instalado em seu sistema.
    
2.  Abra o terminal na pasta do aplicativo.
    
3.  Execute o seguinte comando para instalar as bibliotecas necessárias:    
    `npm install` 
    
4.  Após a conclusão da instalação, inicie o aplicativo com o comando:  
    
    `npm start` 
    

### Embarcado

1.  Configure sua IDE do Arduino para compatibilidade com o ESP8266.
2.  Abra o código-fonte do sistema embarcado na IDE do Arduino.
3.  Certifique-se de ter as bibliotecas necessárias instaladas na IDE.
4.  Localize as linhas no código onde é necessário inserir a SSID (nome da rede Wi-Fi) e a senha do Wi-Fi. Edite essas linhas de acordo.
5.  Compile o código.
6.  Conecte o ESP8266 ao computador e faça o upload do código compilado para o dispositivo.

Ao seguir esses passos, você estará configurando e executando cada componente do sistema: o backend, o aplicativo e o sistema embarcado, garantindo o funcionamento integrado de todas as partes.

## Contribuição

Este projeto foi criado como parte do projeto final da disciplina "Desenvolvimento de Sistemas Móveis e Embarcados" no curso de Sistemas de Informação da Universidade Federal de Santa Catarina. Ficamos felizes com contribuições! Se você desejar, sinta-se à vontade para abrir um pull request com melhorias, correções de bugs ou novos recursos. Sua colaboração é valiosa para nós!
