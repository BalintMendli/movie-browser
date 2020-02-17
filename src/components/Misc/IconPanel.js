import React, { Component } from 'react';
import { MDBIcon, Tooltip, Collapse } from 'mdbreact';
import StarRatings from 'react-star-ratings';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  amberStar,
  amberStarActive,
  redHeart,
  redHeartActive,
  cyanBM,
  cyanBMActive,
} from '../Style/style.module.css';
import { submitRating } from '../../redux/actions/submitRating';
import { addFavorite } from '../../redux/actions/addFavorite';
import { addBookmark } from '../../redux/actions/addBookmark';

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
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
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

  handleFavorite() {
    const { addFavorite, mediaType, id, favorite } = this.props;
    addFavorite({ id, mediaType, favorite: !favorite });
  }

  handleBookmark() {
    const { addBookmark, mediaType, id, watchlist } = this.props;
    addBookmark({ id, mediaType, watchlist: !watchlist });
  }

  render() {
    const { collapseID, icon, ratingMessage } = this.state;
    const { rated, favorite, watchlist } = this.props;
    let collapseContent = '';
    if (icon === 'star') {
      collapseContent = (
        <>
          <StarRatings
            rating={rated}
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
          onClick={this.handleFavorite}
        />
        <MDBIcon
          icon="bookmark"
          size="2x"
          id="bookmark"
          className={`mx-4 ${watchlist ? cyanBMActive : cyanBM}`}
          data-collapse="basicCollapse"
          onClick={this.handleBookmark}
        />
        <Collapse id="basicCollapse" isOpen={collapseID} className="pt-3">
          {collapseContent}
        </Collapse>
      </div>
    );
  }
}

IconPanel.propTypes = {
  mediaType: PropTypes.oneOf(['movie', 'tv', 'person']).isRequired,
  id: PropTypes.number.isRequired,
  rated: PropTypes.number,
  favorite: PropTypes.bool,
  watchlist: PropTypes.bool,
  submitRating: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  addBookmark: PropTypes.func.isRequired,
};

IconPanel.defaultProps = {
  rated: 0,
  favorite: false,
  watchlist: false,
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, {
  submitRating,
  addFavorite,
  addBookmark,
})(IconPanel);
