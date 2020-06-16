import { Component } from 'react';

// Fucntion
const withCos = WrappedComponent => {
  return class WithCos extends Component {
    state = {
      is: true,
    };

    showMe = () => {
      this.setState(prevState => ({
        isShow: !prevState.isShow,
      }));
    };

    render() {
      const { isShow } = this.state;

      return <WrappedComponent isShow={isShow} showMe={this.showMe} />;
    }
  };
};

// return function
// return component

export default withCos;
