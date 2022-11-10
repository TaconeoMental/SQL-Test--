import React, {Component} from "react"
import FormItem from "./FormItem"

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {items: []};
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    render() {
        return (
          <div className="input-boxes">
          </div>
        )
    }
}
