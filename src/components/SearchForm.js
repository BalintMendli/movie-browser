import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Fa } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import { searchInput } from './style.module.css';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      input: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { input } = this.state;
    if (input) {
      this.setState({
        redirect: true,
      });
    }
  }

  render() {
    const { redirect, input } = this.state;
    const { type } = this.props;
    let phAppend;

    if (type === 'movie') {
      phAppend = ' Movies';
    } else if (type === 'tv') {
      phAppend = ' TV Shows';
    } else {
      phAppend = '';
    }

    if (redirect) {
      return <Redirect push to={`/results/${type}/${input}`} />;
    }

    return (
      <form
        className="input-group md-form form-sm form-2 pl-0"
        onSubmit={this.handleSubmit}
      >
        <input
          className={`form-control my-0 py-1 text-white ${searchInput}`}
          type="text"
          placeholder={`Search${phAppend}`}
          aria-label="Search"
          value={input}
          onChange={this.handleChange}
        />
        <div className="input-group-append">
          <button className="input-group-text" type="submit">
            <Fa icon="search" className="text-grey" />
          </button>
        </div>
      </form>
    );
  }
}

SearchForm.propTypes = {
  type: PropTypes.string,
};

SearchForm.defaultProps = {
  type: 'all',
};
