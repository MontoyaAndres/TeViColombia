import React, { PureComponent } from "react";

import { me } from "../../api/user";

const Context = React.createContext();

export class Provider extends PureComponent {
  state = {
    response: {}
  };

  async componentWillMount() {
    const { response } = this.state;

    // When the menu component starts, this will be executed
    if (!Object.keys(response).length) {
      await this.getMeUser();
    }
  }

  getMeUser = async () => {
    const response = await me();

    this.setState({ response });
  };

  render() {
    return (
      <Context.Provider
        value={{
          response: this.state.response,
          actions: {
            getMeUser: this.getMeUser
          }
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
