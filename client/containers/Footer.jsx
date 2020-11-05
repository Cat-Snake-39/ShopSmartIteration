import React, { Component } from 'react';
import Overall from '../components/Overall.jsx';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="footing">
        <Overall props={this.props.props}/>
      </div>
    );
  }
}
export default Footer;
