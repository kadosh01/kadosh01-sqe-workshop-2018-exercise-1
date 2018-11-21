import $ from 'jquery';
import {parseCode,parse_exp} from './code-analyzer';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        var table = parse_exp(parsedCode);
        createTable(table);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 4)); // 2
    });
});

function createTable(dataTable){
    dataTable = dataTable == undefined ? [] : dataTable;
    var tbl_values = ['line', 'type', 'name', 'condition', 'value' ];
    var header = ['Line', 'Type', 'Name', 'Condition', 'Value' ];
    var row_colors = ['#E4E6CC','#E8E9E1'];
    var table = document.getElementById('table');
    table.innerHTML = '';
    var newRow = table.insertRow(table.length);
    var j=0;
    header.forEach(x => newRow.insertCell(j++).innerHTML = x);
    dataTable.forEach((x)=>{
        var newRow = table.insertRow(table.length);
        newRow.bgColor = row_colors[j++%row_colors.length];
        for(var i=0;i<5;i++) {
            var cell = newRow.insertCell(i);
            cell.innerHTML = x[tbl_values[i]];
        }
    });
}