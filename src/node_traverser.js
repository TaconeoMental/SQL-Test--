var sqliteParser = require('sqlite-parser');

export default class SQLReducer {
    constructor(query) {
        this.query = query
        this.ast = sqliteParser(query)
    }

    eval_node(node) {
    }

    eval_query(program) {
        if (program && program["variant"] == "list") {
            console.log(program["statement"])
            for (var statement in program["statement"]) {
                this.eval_node(statement)
            }
        }
    }

    get_reduced() {
        this.eval_query(this.ast)
    }
}
