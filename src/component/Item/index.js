import React, { Component } from "react";
import { observer } from "mobx-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { todoList } from "../../model/TodoModel"


class Item extends Component {
    constructor(props) {
        super(props);
        this.pnlView = React.createRef();
        this.txtEdit = React.createRef();
        this.lblTitle = React.createRef();
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    onKeyDown = (event) => {
        if (event.keyCode === 13) {
            if ((!event.target.value)) {

                toast.error("Please enter valid task name", { 
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    bodyClassName: "notify",
                });
            } else {
                this.props.model.changeTitle(event.target.value)
                this.pnlView.current.style.display = 'block';
                this.lblTitle.current.style.display = 'block';
                this.txtEdit.current.style.display = 'none'
                console.log(event.target.value);
            }
            event.preventDefault();

        }
    }

    render() {

        const completed = this.props.model.isCompleted;
        return (
            <li className={completed ? "completed" : ""}>
                <div ref={this.pnlView} className="view" onDoubleClick={(event) => { event.target.style.display = 'none'; this.txtEdit.current.style.display = 'block';this.txtEdit.current.value=this.props.model.itemTitle;this.txtEdit.current.focus();this.txtEdit.current.setSelectionRange(this.txtEdit.current.value.length, this.txtEdit.current.value.length); }}>

                    <input
                        className="toggle"
                        type="checkbox"
                        onChange={event => {
                            console.log(event.target.checked);
                            this.props.model.toggle();
                        }}
                        defaultChecked={completed}
                    />

                    <label ref={this.lblTitle}>{this.props.model.itemTitle}</label>
                    <button className="destroy" onClick={(event) => {

                        todoList.removeItem(this.props.model.id)

                    }} />
                </div>
                <input ref={this.txtEdit} className="edit" onKeyUp={(event) => {


                    if (event.key === "Escape") {
                        if (this.txtEdit.current.style.display === 'block') {

                            this.pnlView.current.style.display = 'block';
                            this.lblTitle.current.style.display = 'block';
                            this.txtEdit.current.style.display = 'none'

                        } else {

                        }
                    }
                }}

                    onKeyDown={(event) => this.onKeyDown(event)} />
            </li>
        );
    }
}

export default observer(Item);
