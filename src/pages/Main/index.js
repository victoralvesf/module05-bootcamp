import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton, ErrorSmall, List } from './styles';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      newRepo: '',
      repositories: [],
      loading: false,
      statusRepo: '',
    };
  }

  componentDidMount() {
    const localRepositories = localStorage.getItem('repositories');

    if (localRepositories) {
      this.setState({ repositories: JSON.parse(localRepositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, statusRepo: '' });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { newRepo, repositories } = this.state;

    this.setState({ loading: true });

    await api.get(`/repos/${newRepo}`).then(
      response => {
        if (response.message) {
          this.setState({
            statusRepo: response.message,
            newRepo: '',
            loading: false,
          });
        } else {
          const data = {
            name: response.data.full_name,
          };

          this.setState({
            repositories: [...repositories, data],
            newRepo: '',
            statusRepo: '',
            loading: false,
          });
        }
      },
      // eslint-disable-next-line no-unused-vars
      error => {
        this.setState({
          statusRepo: 'Repositório não encontrado.',
          loading: false,
        });
      }
    );
  };

  render() {
    const { newRepo, loading, statusRepo, repositories } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositorios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositorio"
            title="Formato: usuario/repositorio"
            value={newRepo}
            onChange={this.handleInputChange}
            required
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <ErrorSmall>{statusRepo || ''}</ErrorSmall>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <a href={`https://github.com/${repository.name}`} target="blank">
                Detalhes
              </a>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
