import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton } from './styles';

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

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { newRepo, repositories } = this.state;

    this.setState({ loading: true });

    const response = await api.get(`/repos/${newRepo}`);

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
  };

  render() {
    const { newRepo, loading, statusRepo } = this.state;
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
        {statusRepo || ''}
      </Container>
    );
  }
}
