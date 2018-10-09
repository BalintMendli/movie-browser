import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Mask, Fa, Container, Row, Col, Card, CardText } from 'mdbreact';
import { Link } from 'react-router-dom';
import defProf from '../media/default_profile.jpg';
import SmallCards from './SmallCards';
import Loadable from 'react-loadable';
import {
  tabsComp,
  tabContent,
  pills,
  active,
  pillsHeader,
} from './style.module.css';

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: '1',
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    e.preventDefault();
    const { activeItem } = this.state;
    if (activeItem !== e.target.dataset.tab) {
      this.setState({
        activeItem: e.target.dataset.tab,
      });
    }
  }

  render() {
    const { activeItem } = this.state;
    const { movieDetails, tabs, type } = this.props;
    return (
      <div className={tabsComp}>
        <nav>
          <div
            className={`nav nav-pills nav-fill flex-column flex-sm-row ${pillsHeader}`}
            id="nav-tab"
            role="tablist"
          >
            {tabs.map((x, i) => (
              <a
                key={i + 1}
                className={`nav-item nav-link ${pills} ${
                  activeItem === (i + 1).toString() ? active : ''
                }`}
                id={`nav-${x.toLowerCase()}-tab`}
                data-toggle="tab"
                data-tab={i + 1}
                href={`#${x.toLowerCase()}`}
                role="tab"
                aria-controls={`nav-${x.toLowerCase()}`}
                onClick={this.toggle}
              >
                {x}
              </a>
            ))}
          </div>
        </nav>
        <div className={`tab-content ${tabContent}`} id="nav-tabContent">
          {tabs.map((x, i) => {
            const DynComp = Loadable({
              loader: () => import(`./${x}`),
              loading: () => <div>Loading...</div>,
            });
            return (
              <div
                key={i + 1}
                className={`tab-pane fade${
                  activeItem === (i + 1).toString() ? ' show active' : ''
                }`}
                id={`nav-${x.toLowerCase()}`}
                role="tabpanel"
                aria-labelledby={`nav-${x.toLowerCase()}-tab`}
              >
                <DynComp data={movieDetails} type={type} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  movieDetails: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};