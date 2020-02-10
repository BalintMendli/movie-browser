import React, { Component } from 'react';
import { MDBIcon, Tooltip, Collapse } from 'mdbreact';
import StarRatings from 'react-star-ratings';
import { connect } from 'react-redux';
import {
  amberStar,
  amberStarActive,
  redHeart,
  redHeartActive,
  cyanBM,
  cyanBMActive,
} from '../Style/style.module.css';
import { submitRating } from '../../redux/actions/submitRating';

class IconPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: '',
      icon: '',
      ratingMessage: 'Rate It!',
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.closeCollapse = this.closeCollapse.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }

  toggleCollapse(e) {
    const icon = e.target.id;
    const { collapse } = e.target.dataset;
    this.setState(prevState => ({
      icon,
      collapseID: prevState.collapseID !== collapse ? collapse : '',
    }));
    if (icon === 'heart' || icon === 'bookmark') {
      setTimeout(this.closeCollapse, 3000);
    }
  }

  closeCollapse() {
    this.setState({
      collapseID: '',
    });
  }

  changeRating(rating) {
    const { submitRating, mediaType, id } = this.props;
    submitRating({ id, mediaType, rating });
  }

  render() {
    const { collapseID, icon, ratingMessage } = this.state;
    const { accountStates = {} } = this.props;
    const { rated, favorite, watchlist } = accountStates;
    let collapseContent = '';
    if (icon === 'star') {
      collapseContent = (
        <>
          <StarRatings
            rating={rated.value}
            changeRating={this.changeRating}
            starRatedColor="#ffc107"
            starHoverColor="#ffc107"
            starDimension="30px"
            starSpacing="0px"
            numberOfStars={10}
            name="rating"
          />
          <p className="pt-3">{ratingMessage}</p>
        </>
      );
    }
    if (icon === 'heart') {
      collapseContent = <p className="pt-3">Added to Your Favorites</p>;
    }
    if (icon === 'bookmark') {
      collapseContent = <p className="pt-3">Added to Bookmarks</p>;
    }
    return (
      <div className="mt-3 mb-2">
        <MDBIcon
          icon="star"
          size="2x"
          id="star"
          className={`mx-4 ${rated ? amberStarActive : amberStar}`}
          data-collapse="basicCollapse"
          onClick={this.toggleCollapse}
        />
        <MDBIcon
          icon="heart"
          size="2x"
          id="heart"
          className={`mx-4 ${favorite ? redHeartActive : redHeart}`}
          data-collapse="basicCollapse"
          onClick={this.toggleCollapse}
        />
        <MDBIcon
          icon="bookmark"
          size="2x"
          id="bookmark"
          className={`mx-4 ${watchlist ? cyanBMActive : cyanBM}`}
          data-collapse="basicCollapse"
          onClick={this.toggleCollapse}
        />
        <Collapse id="basicCollapse" isOpen={collapseID} className="pt-3">
          {collapseContent}
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, details }) => ({
  auth,
  accountStates: details.movie.account_states,
});

export default connect(mapStateToProps, { submitRating })(IconPanel);
