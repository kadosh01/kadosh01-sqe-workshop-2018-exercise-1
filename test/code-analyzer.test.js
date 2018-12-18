import assert from 'assert';
import {parseCode,parse_exp} from '../src/js/code-analyzer';

describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(parse_exp(parseCode(''))),'[]'
        );
    });

    it('is parsing a simple variable declaration correctly', () => {
        assert.equal(
            JSON.stringify(parse_exp(parseCode('let a = 1;'))),
            '[{"line":1,"type":"VariableDeclarator","name":"a","condition":null,"value":"1"}]'
        );
    });

    it('is parsing a simple while loop correctly', () => {
        assert.equal(
            JSON.stringify(parse_exp(parseCode('while (low >0) {i=i+1; }'))),
            '[{"line":1,"type":"WhileStatement","name":null,"condition":"low >0","value":null},{"line":1,"type":"AssignmentExpression","name":"i","condition":null,"value":"i+1"}]'
        );
    });

    it('is parsing a simple for loop correctly', () => {
        assert.equal(
            JSON.stringify(parse_exp(parseCode('for (i=0;i<4;i=i+1){i=i+1; }'))),
            '[{"line":1,"type":"ForStatement","name":null,"condition":"i<4","value":null},{"line":1,"type":"AssignmentExpression","name":"i","condition":null,"value":"0"},{"line":1,"type":"AssignmentExpression","name":"i","condition":null,"value":"i+1"},{"line":1,"type":"AssignmentExpression","name":"i","condition":null,"value":"i+1"}]'
        );
    });

    it('is parsing a simple assignment statement correctly', () => {
        assert.equal(
            JSON.stringify(parse_exp(parseCode('name = "strongly";'))),
            '[{"line":1,"type":"AssignmentExpression","name":"name","condition":null,"value":"\\"strongly\\""}]'
        );
    });

    it('is parsing a simple if statement correctly', () => {
        assert.equal(
            JSON.stringify(parse_exp(parseCode('if (true) i=i+1; else i=j;'))),
            '[{"line":1,"type":"IfStatement","name":null,"condition":"true","value":null},{"line":1,"type":"AssignmentExpression","name":"i","condition":null,"value":"i+1"},{"line":1,"type":"AssignmentExpression","name":"i","condition":null,"value":"j"}]'
        );
    });

    it('is parsing a simple function statement correctly', () => {
        assert.equal(
            JSON.stringify(parse_exp(parseCode('function binarySearch(X, V, n){\n'+
                'let low, high, mid;\n'+
                'low = 0;\n' +
                'return low ;\n' + '}'))),
            '[{"line":1,"type":"FunctionDeclaration","name":"binarySearch","condition":null,"value":null},{"line":1,"type":"Identifier","name":"X","condition":null,"value":null},{"line":1,"type":"Identifier","name":"V","condition":null,"value":null},{"line":1,"type":"Identifier","name":"n","condition":null,"value":null},{"line":2,"type":"VariableDeclarator","name":"low","condition":null,"value":null},{"line":2,"type":"VariableDeclarator","name":"high","condition":null,"value":null},{"line":2,"type":"VariableDeclarator","name":"mid","condition":null,"value":null},{"line":3,"type":"AssignmentExpression","name":"low","condition":null,"value":"0"},{"line":4,"type":"ReturnStatement","name":null,"condition":null,"value":"low"}]'
        );
    });

    it('is parsing a simple if without else statement correctly', () => {
        assert.equal(
            JSON.stringify(parse_exp(parseCode('if (i>0) mid=0;'))),
            '[{"line":1,"type":"IfStatement","name":null,"condition":"i>0","value":null},{"line":1,"type":"AssignmentExpression","name":"mid","condition":null,"value":"0"}]'
        );
    });

    it('is parsing a simple function statement with empty body correctly', () => {
        assert.equal(
            JSON.stringify(parse_exp(parseCode('function binarySearch(X, V, n){\n'+
                'return X ;\n' + '}'))),
            '[{"line":1,"type":"FunctionDeclaration","name":"binarySearch","condition":null,"value":null},{"line":1,"type":"Identifier","name":"X","condition":null,"value":null},{"line":1,"type":"Identifier","name":"V","condition":null,"value":null},{"line":1,"type":"Identifier","name":"n","condition":null,"value":null},{"line":2,"type":"ReturnStatement","name":null,"condition":null,"value":"X"}]'
        );
    });


    it('is parsing a simple complexity code correctly', () => {
        assert.equal(
            JSON.stringify(parse_exp(parseCode('function binarySearch(X, V, n){\n' +
                '    let low, high, mid;\n' +
                '    low = 0;\n' +
                '    high = n - 1;\n' +
                '    while (low <= high) {\n' +
                '        mid = (low + high)/2;\n' +
                '        if (X < V[mid])\n' +
                '            high = mid - 1;\n' +
                '        else if (X > V[mid])\n' +
                '            low = mid + 1;\n' +
                '        else\n' +
                '            return mid;\n' +
                '    }\n' +
                '    return -1;\n' +
                '}'))),
            '[{"line":1,"type":"FunctionDeclaration","name":"binarySearch","condition":null,"value":null},{"line":1,"type":"Identifier","name":"X","condition":null,"value":null},{"line":1,"type":"Identifier","name":"V","condition":null,"value":null},{"line":1,"type":"Identifier","name":"n","condition":null,"value":null},{"line":2,"type":"VariableDeclarator","name":"low","condition":null,"value":null},{"line":2,"type":"VariableDeclarator","name":"high","condition":null,"value":null},{"line":2,"type":"VariableDeclarator","name":"mid","condition":null,"value":null},{"line":3,"type":"AssignmentExpression","name":"low","condition":null,"value":"0"},{"line":4,"type":"AssignmentExpression","name":"high","condition":null,"value":"n - 1"},{"line":5,"type":"WhileStatement","name":null,"condition":"low <= high","value":null},{"line":6,"type":"AssignmentExpression","name":"mid","condition":null,"value":"(low + high)/2"},{"line":7,"type":"IfStatement","name":null,"condition":"X < V[mid]","value":null},{"line":8,"type":"AssignmentExpression","name":"high","condition":null,"value":"mid - 1"},{"line":9,"type":"IfStatement","name":null,"condition":"X > V[mid]","value":null},{"line":10,"type":"AssignmentExpression","name":"low","condition":null,"value":"mid + 1"},{"line":12,"type":"ReturnStatement","name":null,"condition":null,"value":"mid"},{"line":14,"type":"ReturnStatement","name":null,"condition":null,"value":"-1"}]'
        );
    });
});
