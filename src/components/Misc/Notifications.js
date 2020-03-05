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
          title={n.message}
          show
          fade
          autohide={5000}
          icon="exclamation-triangle"
          titleClassName="bg-transparent text-dark d-flex"
          iconClassName="orange-text"
          closeClassName="ml-4"
          bodyClassName="d-none"
        />
      ))}
    </MDBContainer>
  );
}

const mapStateToProps = ({ notifications }) => ({ notifications });

export default connect(mapStateToProps)(Notifications);
