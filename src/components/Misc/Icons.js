import React, { Component } from 'react';
import {
  View,
  Mask,
  Fa,
  Container,
  Row,
  Col,
  Tooltip,
  Collapse,
} from 'mdbreact';
import StarRatings from 'react-star-ratings';
import {
  bg,
  posterImg,
  carText,
  amberStar,
  redHeart,
  cyanBM,
} from '../Style/style.module.css';

export default class Icons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: '',
      icon: '',
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.closeCollapse = this.closeCollapse.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }

  toggleCollapse(e) {
    console.log(e.target.dataset.collapse);
    const icon = e.target.id;
    const collapse = e.target.dataset.collapse;
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

  changeRating(newRating) {
    this.setState({
      rating: newRating,
    });
  }

  render() {
    const { collapseID, rating, icon } = this.state;
    let collapseContent = '';
    if (icon === 'star') {
      collapseContent = (
        <>
          <StarRatings
            rating={rating}
            changeRating={this.changeRating}
            starRatedColor="#ffc107"
            starHoverColor="#ffc107"
            starDimension="30px"
            starSpacing="0px"
            numberOfStars={10}
            name="rating"
          />
          <p className="pt-3">Rate It!</p>
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
        <Tooltip placement="bottom">
          <Fa
            icon="star"
            size="2x"
            id="star"
            className={amberStar}
            data-collapse="basicCollapse"
            onClick={this.toggleCollapse}
          />
          <div>Rate It!</div>
        </Tooltip>
        {/* <Tooltip
          placement="bottom"
          tooltipContent="Mark as Favorite"
          className="d-inline pr-5"
          componentClass="d-inline"
        >
          <Fa
            icon="heart"
            size="2x"
            id="heart"
            className={redHeart}
            data-collapse="basicCollapse"
            onClick={this.toggleCollapse}
          />
        </Tooltip>
        <Tooltip
          placement="bottom"
          tooltipContent="Add to your watchlist"
          className="d-inline"
          componentClass="d-inline"
        >
          <Fa
            icon="bookmark"
            size="2x"
            id="bookmark"
            className={cyanBM}
            data-collapse="basicCollapse"
            onClick={this.toggleCollapse}
          />
        </Tooltip> */}
        <Collapse id="basicCollapse" isOpen={collapseID} className="pt-3">
          {collapseContent}
        </Collapse>
      </div>
    );
  }
}
