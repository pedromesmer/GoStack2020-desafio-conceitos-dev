const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid')

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, techs, url } = request.body

  const repository = {
    id: uuid(),
    title,
    url: url,
    techs: techs,
    likes: 0
  }
  repositories.push(repository)

  return response.status(201).json(repository)

});

app.put("/repositories/:id", (request, response) => {
  // A rota deve alterar apenas o title, a url e as techs do repositório que possua o id igual ao id presente nos parâmetros da rota;
  const { url, title, techs } = request.body
  const { id } = request.params

  // if (!isUuid(id)) {
  //   return response.status(400).json({
  //     message: 'Invalid ID'
  //   })
  // }

  const repositorieIndex = repositories.findIndex(repo => repo.id == id)

  if (repositorieIndex < 0) {
    return response.status(400).json({
      message: 'Repository not found'
    })
  }
  const { likes } = repositories[repositorieIndex]

  repositories[repositorieIndex] = {id, title, url, techs, likes}

  return response.json(repositories[repositorieIndex])

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  // if (!isUuid(id)) {
  //   return response.status(400).json({
  //     message: 'Invalid ID'
  //   })
  // }

  const repositorieIndex = repositories.findIndex(repo => repo.id == id)

  if (repositorieIndex < 0) {
    return response.status(400).json({
      message: 'Repository not found'
    })
  }

  repositories.splice(repositorieIndex, 1)

  return response.status(204).json()

});

app.post("/repositories/:id/like", (request, response) => {
  // A rota deve aumentar o número de likes do repositório específico escolhido através do id presente nos parâmetros da rota, 
  // a cada chamada dessa rota, o número de likes deve ser aumentado em 1
  const {  } = request.body
  const { id } = request.params

  // if (!isUuid(id)) {
  //   return response.status(400).json({
  //     message: 'Invalid ID'
  //   })
  // }

  const repositorieIndex = repositories.findIndex(repo => repo.id == id)

  if (repositorieIndex < 0) {
    return response.status(400).json({
      message: 'Repository not found'
    })
  }
  // title, techs, url
  let { likes, title, techs, url } = repositories[repositorieIndex]
  likes += 1
  
  repositories[repositorieIndex] = {
    id,
    title,
    url,
    techs,
    likes 
  }

  return response.json(repositories[repositorieIndex])

});

module.exports = app;
