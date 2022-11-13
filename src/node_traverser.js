const { Parser } = require('node-sql-parser')

export default class SQLReducer {
    constructor() {
        this.query = ""
        this.parser = new Parser()
    }

    eval_node(node) {
    }

    get_reduced(query) {
        try {
            var ast = this.parser.astify(query)
            //console.log(ast)
        } catch (err) {
            //console.log(err)
            return
        }

        var level = 0
        var statements = [query]
        //while (this.is_reducible_level(level)) {
            //this.eval_query(this.ast)
            //var reduced_ast = this.reduce_level(level)
        //}
        return statements
    }
}
