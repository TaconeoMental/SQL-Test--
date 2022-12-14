import "./index.css";
import logo from './logo.svg'
import Template from './template.js'
import SQLReducer from './node_traverser.js'
import React from 'react';

import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { githubDark } from '@uiw/codemirror-theme-github';

class  App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form_fields: {},
            template: new Template(""),
            replaced_query: ""
        }
    }

    handle_editor_change = (query) => {
        var template = new Template(query)
        var fields = template.get_fields()

        var new_fields = {}
        for (var i = 0; i < fields.length; i++) {
            var field_name = fields[i].name
            var field_def_val = fields[i].default

            new_fields[field_name] = {value: "", default: field_def_val}
        }

        this.setState({
            form_fields: new_fields,
            template: template
        })

        this.update_query()
    }

    update_query = () => {
        var replace_dict = {}
        Object.keys(this.state.form_fields).map((name) => {
            replace_dict[name] = this.state.form_fields[name].value||this.state.form_fields[name].default
        })

        this.setState((state) => {
            return {replaced_query: state.template.build(replace_dict)}
        })

    }

    handle_form_change = (e) => {
        var new_dict = this.state.form_fields
        new_dict[e.target.name].value = e.target.value

        this.setState((state) => {
            return {form_fields: new_dict}
        })
        this.update_query()
    }

    render() {
        return (
            <div className="app-container">
                <div className="header-logo">
                    <img src={logo} className="logo" />
                </div>

                <div className="main-input">
                    <CodeMirror
                        placeholder="SELECT * FROM web_apps WHERE host = 'sdterr.cl'"
                        extensions={[
                            sql({upperCaseKeywords: true})
                        ]}
                        theme={ githubDark }
                        onChange={this.handle_editor_change}
                    />
                </div>
                <div className="column-left">
                    <form className="input-boxes">
                        {Object.keys(this.state.form_fields).map((item, index) => {
                            return (
                                <div key={index}>
                                    <p className="input-text">{item}</p>
                                    <input
                                        type="input"
                                        className="user-input"
                                        placeholder={this.state.form_fields[item].default}
                                        name={item}
                                        onChange={this.handle_form_change}
                                    />
                                </div>
                            )
                        })}
                    </form>
                </div>

                <div className="column-right">
                    <div className="sql-show">
                        <CodeMirror
                            value={this.state.replaced_query}
                            extensions={[
                                sql({upperCaseKeywords: true})
                            ]}
                            readOnly={ true }
                            theme={ githubDark }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
