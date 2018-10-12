import React from 'react';
import { Col, Container, Row, Footer } from 'mdbreact';
import PoweredBy from '../../media/powered-by.svg';
import './Footer.css';

const FooterComp = () => (
  <Footer color="unique-color-dark" className="font-small pt-4">
    <Container fluid className="text-center text-md-left">
      <Row className="justify-content-center">
        <Col md="4" className="text-center">
          <img
            src={PoweredBy}
            height="100px"
            alt="powered by"
            className="mt-2"
          />
        </Col>
        <Col md="4" className="text-center">
          <h5 className="title">Links</h5>
          <ul>
            <li className="list-unstyled">
              <a href="/">Home</a>
            </li>
            <li className="list-unstyled">
              <a href="/movies">Movies</a>
            </li>
            <li className="list-unstyled">
              <a href="/tv-shows">TV Shows</a>
            </li>
            <li className="list-unstyled">
              <a href="/profile">Profile</a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
    <div className="footer-copyright text-center py-3">
      <Container fluid>
        {new Date().getFullYear()} - Movie App
        <span className="text-muted"> by</span>
        <a href="https://github.com/zenott"> zenott</a>
      </Container>
    </div>
  </Footer>
);

export default FooterComp;
