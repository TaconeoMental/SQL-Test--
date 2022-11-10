export default class Template {
    constructor(query) {
        this.query = query

        this.tokens = []
        this.index = 0

        this.current_char = ''
        this.peek_char = this.query[this.index]

        this.parse()
    }

    push_char() {
        this.current_char = this.peek_char
        this.index += 1
        this.peek_char = this.query[this.index]
        return this.current_char
    }

    tokenize_string() {
        var str = this.current_char
        while (this.peek_char && this.peek_char !== "{") {
            this.push_char()
            str += this.current_char
        }
        this.tokens.push(str)
        return true
    }

    get_word() {
        var name = this.push_char()
        while (this.peek_char && this.peek_char.match(/[0-9a-zA-Z_]/)) {
            this.push_char()
            name += this.current_char
        }
        return name
    }

    tokenize_template() {
        var name = this.get_word()
        var def = ""

        if (this.peek_char === ":") {
            this.push_char()
            if (this.peek_char !== "}") {
                def = this.get_word()
            }
        }
        this.push_char()
        if (this.current_char !== "}") {
            console.log("Invalid Syntax")
            return false
        }
        this.tokens.push({"name": name, "default": def})
        return true
    }

    parse() {
        while (this.push_char()) {
            if (this.current_char === "{") {
                this.tokenize_template()
            } else {
                this.tokenize_string()
            }
        }
    }

    get_fields() {
        var field_names = []
        for (var i = 0; i < this.tokens.length; i++) {
            var elem = this.tokens[i]
            if (typeof(elem) != "string") {
                field_names.push(elem)
            }
        }
        return field_names.sort((x, y) => {
            return (x.name > y.name) - (x.name < y.name)
        }).filter((value, index, array) => {
            return (index === 0) || (value.name !== array[index - 1].name);
        })
    }

    build(h) {
        //259
        var final_str = ""
        for (var i = 0; i < this.tokens.length; i++) {
            var elem = this.tokens[i]
            if (typeof(elem) == "string") {
                final_str += elem
            } else {
                if (h && h.hasOwnProperty(elem["name"])) {
                    final_str += h[elem["name"]]
                } else {
                    final_str += elem["default"]
                }
            }
        }
        return final_str
    }
}
