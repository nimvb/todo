import React, { Component } from "react";
import { observer } from "mobx-react";

class Status extends Component {
  constructor(props) {
    super(props);
    this.onChangeListView = this.onChangeListView.bind(this);
    this.onClearCompletedItems = this.onClearCompletedItems.bind(this);
    this.btnActive = React.createRef();
    this.btnComplete = React.createRef();
    this.btnAll = React.createRef();
  }

  onChangeListView = event => {
    this.btnAll.current.className = "";
    this.btnActive.current.className = "";
    this.btnComplete.current.className = "";
    event.target.className = "selected";
    this.props.model.setMode(event.target.getAttribute("data-mode"));

    event.preventDefault();
  };

  onClearCompletedItems = event => {
    this.props.model.removeItems(true);
    event.preventDefault();
  };

  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.model.unCompletedItemsCount}</strong> item left
        </span>

        <ul className="filters">
          <li>
            <a
              data-mode="all"
              ref={this.btnAll}
              className="selected"
              href="#/"
              onClick={event => {
                this.onChangeListView(event);
              }}
            >
              All
            </a>
          </li>
          <li>
            <a
              data-mode="active"
              ref={this.btnActive}
              href="#/"
              onClick={event => {
                this.onChangeListView(event);
              }}
            >
              Active
            </a>
          </li>
          <li>
            <a
              data-mode="completed"
              ref={this.btnComplete}
              href="#/"
              onClick={event => {
                this.onChangeListView(event);
              }}
            >
              Completed
            </a>
          </li>
        </ul>

        {this.props.model.completedItemExists ? (
          <button
            className="clear-completed"
            onClick={event => {
              this.onClearCompletedItems(event);
            }}
          >
            Clear completed
          </button>
        ) : (
          ""
        )}
      </footer>
    );
  }
}

export default observer(Status);
