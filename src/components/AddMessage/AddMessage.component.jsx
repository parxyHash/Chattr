import React from "react";
import { firestore } from "../../firebase/firebase.utils";

import { styleFunc, inputHelper } from "../../utils/utilities";

import "./AddMessage.styles.scss";

export default class AddMessage extends React.Component {
  state = {
    message: "",
    user: ""
  };

  componentDidMount = () => {
    const { displayName, uid, email } = this.props;
    this.setState({
      user: {
        displayName,
        uid,
        email
      }
    });
  };
  handleSubmit = async event => {
    event.preventDefault();
    if (!this.state.message) {
      alert("Please enter a message!");
    } else {
      try {
        const { message } = this.state;
        const { displayName, uid, email } = this.props;
        let post = {
          message,
          user: {
            displayName,
            uid,
            email
          },
          createdAt: new Date()
        };
        await firestore.collection("messages").add(post);
      } catch (error) {
        console.error("Error", error.message);
      } finally {
        this.setState({ message: "" });
      }
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="AddPost">
        <span style={{ color: "green" }}>→</span>
        {this.state.message.length < 1 ? (
          <div className="blink" style={{ opacity: 1 }}></div>
        ) : (
          <div className="blink" style={{ opacity: 0 }}></div>
        )}
        <input
          style={styleFunc(this.state.message)}
          className="add-message"
          type="text"
          autoComplete="off"
          name="message"
          value={inputHelper(this.state.message)}
          onChange={e => this.setState({ message: e.target.value })}
        />
      </form>
    );
  }
}
