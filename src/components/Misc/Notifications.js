import React from 'react';
import { MDBContainer, MDBNotification } from 'mdbreact';
import { connect } from 'react-redux';

function Notifications({ notifications }) {
  return (
    <MDBContainer
      style={{
        width: 'auto',
        position: 'fixed',
        top: '80px',
        right: '10px',
        zIndex: 9999,
      }}
    >
      {notifications.map(n => (
        <MDBNotification
          key={n.ts}
          show
          fade
          autohide={5000}
          iconClassName="d-none"
          message={n.message}
        />
      ))}
    </MDBContainer>
  );
}

const mapStateToProps = ({ notifications }) => ({ notifications });

export default connect(mapStateToProps)(Notifications);
