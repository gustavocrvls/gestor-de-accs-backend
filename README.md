<p align="center">
  <img src="https://github.com/gustavocrvls/icons/blob/f9f809ad6c69d21ca1c5149f2b910ea9e294d43a/keeme.png" width="50"/>
</p>

# KeeMe

<p align="center">
  <a href="https://rocketseat.com.br">
    <img alt="Made by Gustavo Carvalho Silva" src="https://img.shields.io/badge/made%20by-Gustavo%20Carvalho%20Silva-008080">
  </a>
  <img alt="License" src="https://img.shields.io/badge/license-MIT-008080">
</p>

## 💡 Sobre o Projeto

O projeto foi desenvolvido durante um Trabalho de Conclusão de Curso do curso de Sistemas de Informação da UNIFESSPA.

O KeeMe é uma aplicação de gerenciamento das Atividades Curriculares Complementares dos discentes da Faculdade de Computação e Engenharia Elétrica da UNIFESSPA, criado com o foco em tornar simples e transparente o processo de avaliação.

O projeto está dividido em duas partes:
- [Front-end](https://github.com/gustavocrvls/keeme-frontend)
- [Back-end](https://github.com/gustavocrvls/keeme-backend)

## 🛠 Tecnologias Usadas
- Node.js
- Typescript
- Express
- TypeORM

## 🧙‍♂️ Como Iniciar o Projeto

Primeiro faça a clonagem do projeto em algum diretorio do seu computador:
```bash
> cd "algum/diretorio/qualquer"
> git clone https://github.com/gustavocrvls/keeme-backend.git
```
Depois disso instale as dependências:
```bash
> yarn install
```
Após isso crie um arquivo _.env_ na raiz do projeto, preenchendo os campos que estão em _.env.example_:

```env
API_PORT=
JWT_SECRET=

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
```

Você vai precisar iniciar o banco de dados, usando o TypeORM.

⚠ Por padrão na criação do banco é criado um usuário do tipo Administrador, com a senha padrão "password", para mudar isso execute:
```bash
  NODE_ENV=development ADMIN_PASSWORD="nova_senha" yarn typeorm migration:run
```

Caso você não precise de uma senha forte (como em um ambiente de testes), ou caso você precise rodar outras migrations, basta executar:
```bash
  NODE_ENV=development yarn typeorm migration:run
```

E então é só iniciar o projeto:
```bash
> yarn dev
```

O projeto vai iniciar em http://localhost na porta em que foi definida no _.env_.

## 📚 Documentação da API

Você também pode acessar a documentação das rotas da API em:
https://app.swaggerhub.com/apis-docs/gustavocrvls/KeeMe/1.0.0

## ⚙ Para codificar

O projeto foi criado usando as seguintes bibliotecas de padronização de código:
- ESLint
- Prettier
- EditorConfig

Por isso, deve ser usado o VSCode e instaladas as seguintes bibliotecas para não bagunçar o código 😆:
- EditorConfig for VS Code
- ESLint

Isso é uma forma de manter o código minimamente organizado, e padronizado.

E isso é tudo ~por enquanto~ 😁
