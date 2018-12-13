import React, { Component } from 'react';
import { Fa, Button, MDBInputGroup } from 'mdbreact';

export default class SearchBox extends Component {
  state = {
    input: '',
  };

  onChange = value => {
    this.setState({ input: value });
  };

  render() {
    const { input } = this.state;
    return (
      <></>
      // <MDBInputGroup
      //   hint="Type to search"
      //   containerClassName="mb-3"
      //   value={input}
      //   getValue={this.onChange}
      //   append={
      //               <Button color="grey" className="m-0 px-3 py-2 z-depth-0">
      //       <Fa icon="search" className="lime-text" />
      //     </Button>
      //   }
      // />
    );
  }
}
