import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, SetRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      SetRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      id: Date.now(),
      title: `Novo repositório ${Date.now()}`,
      url: "https://github.com/lucasapos/desafio-conceitos-reactjs",
      techs: [
          "NodeJS",
          "React Native",
          "ReactJS"
      ],
      likes: 0
    });

    const repository = response.data;

    SetRepositories([... repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    api.delete(`/repositories/${id}`);
    SetRepositories([]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {
          repositories.map(repository => <li key={repository.id}>{repository.title} <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></li>)
          }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
