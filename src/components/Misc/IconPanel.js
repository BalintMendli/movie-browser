import React, { Component } from 'react';
import { MDBIcon, MDBTooltip, Collapse } from 'mdbreact';
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
import { addNotification } from '../../redux/actions/notifications';

class IconPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: '',
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.closeCollapse = this.closeCollapse.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
  }

  toggleCollapse(e) {
    const { collapse } = e.target.dataset;
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapse ? collapse : '',
    }));
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
    const { collapseID } = this.state;
    const { rated, favorite, watchlist, mediaType } = this.props;
    const collapseContent = (
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
        <p className="pt-3">
          {`Rate ${mediaType === 'tv' ? 'TV Show' : 'Movie'}!`}
        </p>
      </>
    );

    return (
      <>
        <div className="mt-3 mb-2 mx-4 d-flex justify-content-around">
          <MDBTooltip placement="bottom" domElement>
            <div className={watchlist ? cyanBMActive : cyanBM}>
              <MDBIcon
                icon="star"
                size="2x"
                id="star"
                className={rated ? amberStarActive : amberStar}
                data-collapse="basicCollapse"
                onClick={this.toggleCollapse}
              />
            </div>
            <div>{`Rate ${mediaType === 'tv' ? 'TV Show' : 'Movie'}!`}</div>
          </MDBTooltip>
          <MDBTooltip placement="bottom" domElement>
            <div className={watchlist ? cyanBMActive : cyanBM}>
              <MDBIcon
                icon="heart"
                size="2x"
                id="heart"
                className={favorite ? redHeartActive : redHeart}
                onClick={this.handleFavorite}
              />
            </div>
            <div>Mark as Favorite!</div>
          </MDBTooltip>
          <MDBTooltip placement="bottom" domElement>
            <div className={watchlist ? cyanBMActive : cyanBM}>
              <MDBIcon
                icon="bookmark"
                size="2x"
                id="bookmark"
                onClick={this.handleBookmark}
              />
            </div>
            <div>Add to Watchlist!</div>
          </MDBTooltip>
        </div>
        <Collapse id="basicCollapse" isOpen={collapseID} className="pt-3">
          {collapseContent}
        </Collapse>
      </>
    );
  }
}

IconPanel.propTypes = {
  mediaType: PropTypes.oneOf(['movie', 'tv']).isRequired,
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

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, {
  submitRating,
  addFavorite,
  addBookmark,
  addNotification,
})(IconPanel);
