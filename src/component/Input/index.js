import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class Input extends Component {

    constructor(props) {
        super(props);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            value: ""
        }
    }

    onKeyDown = (event) => {
        if (event.keyCode === 13) {
            if ((!this.state.value)) {

                toast.error("Please enter valid task name", { 
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    bodyClassName: "notify",
                });
                
            } else {
                this.props.model.addItemByTtitle(this.state.value)
            }
            this.setState({
                value: ''
            })
            event.preventDefault();

        }
    }


    onChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }

    render() {
        return [
            <ToastContainer autoClose={2000}></ToastContainer>,
            <header className="header">
            
                <h1>todos</h1>
                <input
                    onKeyDown={(event) => this.onKeyDown(event)}
                    onChange={(event) => this.onChange(event)}
                    value={this.state.value}
                    className="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus
                />
            </header>
        ]
    }
}