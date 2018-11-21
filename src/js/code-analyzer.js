import * as esprima from 'esprima';
//const esprima = require("esprima");


function parseCode(codeToParse) {
    var parsedCode = esprima.parseScript(codeToParse, {loc:true ,range:true},function(node){
        node.string=getStatement(node.range[0],node.range[1],codeToParse);
    });
    return parsedCode;
}



const expConstructor = (line,type,name,condition,value)=> {return {line:line,type:type,name:name,condition:condition,value:value};};

const parse_exp = (JsonCode) =>{
    var functionsPointers = [parse_program,parse_FunctionDeclaration,parse_Identifier,parse_VariableDeclaration,parse_VariableDeclarator,parse_ExpressionStatement,parse_WhileStatement,parse_IfStatement,parse_ReturnStatement,parse_AssignmentExpression,parse_ForStatement];
    var functionType = ['Program','FunctionDeclaration','Identifier','VariableDeclaration','VariableDeclarator','ExpressionStatement','WhileStatement','IfStatement','ReturnStatement','AssignmentExpression','ForStatement'];
    var index = functionType.indexOf(JsonCode.type);
    return functionsPointers[index](JsonCode);
};


const getStatement=(start,end,source)=>{
    return source.slice( start, end);
};


const parse_program = (object) => {
    return object.body.length == 0 ? [] :
        (object.body.map((x)=>parse_exp(x)))[0];
};

const parse_ForStatement = (object) =>{
    var line = object.loc.start.line;
    var init = parse_exp(object.init);
    var test=object.test.string;
    var type = object.type;
    var update = parse_exp(object.update);
    var body = parse_BlockStatement(object.body);
    return (([expConstructor(line,type,null,test,null)].concat(init)).concat(update)).concat(body);
};

const parse_WhileStatement = (object) =>{
    var line = object.loc.start.line;
    var test=object.test.string;
    var type = object.type;
    var body = parse_BlockStatement(object.body);
    return ([expConstructor(line,type,null,test,null)].concat(body));
};

const parse_IfStatement = (object) =>{
    var line = object.loc.start.line;
    var type = object.type ;
    var test = object.test.string;
    var consequent = parse_exp(object.consequent);
    var alt = object.alternate == null ? null : parse_exp(object.alternate);
    return (([expConstructor(line,type,null,test,null)].concat(consequent)).concat(alt));
};

const parse_FunctionDeclaration = (object) => {
    var line = object.id.loc.start.line;
    var name = object.id.name;
    var type = object.type;
    var params = object.params.reduce((x,y)=>x.concat(parse_Identifier(y)),[]);     //map((x)=>(parse_Identifier(x)));
    var body = parse_BlockStatement(object.body);
    return (([expConstructor(line,type,name,null,null)].concat(params)).concat(body));

};

const parse_ExpressionStatement = (object) =>{
    return parse_exp(object.expression) ;
};

const parse_AssignmentExpression = (object) =>{
    var line = object.loc.start.line;
    var type = object.type;
    var name = object.left.name;
    var val = object.right.string;
    return [expConstructor(line,type,name,null,val)] ;
};

const parse_VariableDeclarator = (object) =>{
    return [expConstructor(object.id.loc.start.line,object.type,object.id.name,null,(object.init==null ? null : object.init.string))] ;
};

const parse_ReturnStatement = (object) =>{
    return [expConstructor(object.loc.start.line,object.type,null,null,object.argument.string)] ;
};

const parse_BlockStatement = (object) =>{
    return object.body.reduce((x,y)=>x.concat(parse_exp(y)),[]);
};

const parse_VariableDeclaration = (object) =>{
    return object.declarations.reduce((x,y)=>x.concat(parse_VariableDeclarator(y)),[]);
};

const parse_Identifier = (object) =>{
    return [expConstructor(object.loc.start.line,object.type,object.name,null,null)] ;
};

export {parseCode,parse_exp};


