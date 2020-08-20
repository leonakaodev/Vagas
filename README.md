# Sobre o projeto

Este projeto foi desenvolvido a partir do desafio para a vaga de dev. fullstack da ez.devs.

Consiste na criação de um WEBAPP para o cadastro e visualização de algumas postagens e categorias, semelhante a um blog, e de uma API para sua alimentação.

O WEBAPP foi desenvolvido utilizando **VueJs**, em conjunto com algumas outras ferramentas do seu ecosistema, como: 
- **Router**
- **Vuex** e
- **Vuetify**.

A API foi desenvolvida utilizando **NodeJs** com o **Express**. Para o controle e configuração da base de dados, foi utilizado o **Knex**.

# Setup 

Para visualizar o projeto, comece clonando este repositório e em seguida siga os passos para executar o WEBAPP e a API, juntos.

## WEBAPP

Para visualizar a aplicação, basta acessar a pasta **frontend** e executar os seguites comandos:

```
npm install
npm run serve
```

## API

Para executar a API, basta acessar a pasta **backend** e executar os seguites comandos:

```
npm install
npm run db:migrate
npm run start
```
