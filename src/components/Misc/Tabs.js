import React, { Component } from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import {
  tabsComp,
  tabContent,
  pills,
  active,
  pillsHeader,
} from '../Style/style.module.css';
import { movieType, tvType, personType } from '../types';

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
    const { tabs, details, type } = this.props;
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
                key={x}
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
            const DynComp = loadable(() => import(`../TabComps/${x}`));
            return (
              <div
                key={x}
                className={`tab-pane fade${
                  activeItem === (i + 1).toString() ? ' show active' : ''
                }`}
                id={`nav-${x.toLowerCase()}`}
                role="tabpanel"
                aria-labelledby={`nav-${x.toLowerCase()}-tab`}
              >
                <DynComp data={details} type={type} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  details: PropTypes.oneOfType([movieType, tvType, personType]).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.oneOf(['movie', 'tv', 'person']).isRequired,
};
