import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Item from '../Item';


class List extends Component {

    constructor(props) {
        super(props);
        this.onToggleChange = this.onToggleChange.bind(this)

    }

    onToggleChange = (event) => {

        const found = this.props.model.items.find((item) => item.completed === false) !== undefined;

        for (let index = 0; index < this.props.model.items.length; index++) {
            if(found){
            this.props.model.items[index].changeCompleted(true);
            }else{
                this.props.model.items[index].changeCompleted(false);
            }
            
        }

        event.target.checked = !event.target.checked

        event.preventDefault();

    }

    render() {
        return (
            <section className="main">

                {
                    /*
                    this.props.model.empty === false ?
                        [
                            <input key={707}  id="toggle-all" className="toggle-all" type="checkbox" onChange={(event) => {this.onToggleChange(event)}} defaultChecked={false}/>,
                            <label key={708} htmlFor="toggle-all">Mark all as complete</label>
                        ]
                        :
                        ''*/
                }

                <ul className="todo-list">

                    {
                        this.props.model.currentItems.map((item) => {
                            return (
                                <Item key={item.itemId} model={item}></Item>
                            )
                        })
                    }

                </ul>
            </section>
        )
    }
}


export default observer(List)