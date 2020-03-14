import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'mdbreact';
import { bg } from '../Style/style.module.css';
import SearchResultsElem from './SearchResultsElem';
import { API_KEY } from '../../utils/resources';
import Loading from '../Misc/Loading';
import Error from '../Misc/Error';

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    console.log(match);
    let url;
    if (match.params.type === 'movie') {
      url = 'https://api.themoviedb.org/3/search/movie';
    } else if (match.params.type === 'tv') {
      url = 'https://api.themoviedb.org/3/search/tv';
    } else {
      url = 'https://api.themoviedb.org/3/search/multi';
    }
    this.setState({ isLoading: true });
    axios
      .get(`${url}?query=${match.params.query}&api_key=${API_KEY}`)
      .then(response => {
        this.setState({ results: response.data, isLoading: false });
        console.log(response.data);
      })
      .catch(error =>
        this.setState({
          error,
          isLoading: false,
        }),
      );
  }

  render() {
    const { results, error, isLoading } = this.state;
    if (error) {
      return <Error />;
    }

    if (isLoading) {
      return <Loading />;
    }
    return (
      <div className={bg}>
        <Container className="text-white">
          <Row className="justify-content-center">
            <Col size="10">
              <h3 className="mb-4">Search results:</h3>
              {results.results.map(data => (
                <SearchResultsElem key={data.id} data={data} />
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
