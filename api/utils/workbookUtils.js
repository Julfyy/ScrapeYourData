const Excel = require('exceljs');
const { findMaxColumnSize } = require("./arrayUtils");

const initWorkBook = () => {
    let workbook = new Excel.Workbook();

    workbook.creator = 'Julfy';
    workbook.lastModifiedBy = 'Me';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();
    workbook.properties.date1904 = true;

    workbook.views = [
        {
            x: 0,
            y: 0,
            width: 10000,
            height: 20000,
            firstSheet: 0,
            activeTab: 1,
            visibility: 'visible',
        },
    ];

    return workbook;
}

const setColumns = (data, worksheet) => {
    let columns = [];
    for (let i = 0; i < data.length; i++) {
        columns.push({ header: data[i].key, key: `${i}`, width: 70 });
    }
    worksheet.columns = columns;

    return worksheet;
}

const formatData = (data) => {
    let result = [];
    const maxSize = findMaxColumnSize(data);
    for (let i = 0; i < maxSize; i++) {
        let row = [];
        for (let elem of data) {
           row.push(elem.content[i] === undefined ? '' : elem.content[i]);
        }
        result.push(row);
    }

    return result;
}

const createRowFromArray = (rowData) => {
    let endRow = {};
    let i = 0;

    for (let item of rowData) {
        const jsonItem = JSON.parse(`{ "${i++}": "${item}" }`);
        Object.assign(endRow, jsonItem);
    }

    return endRow;
}

module.exports = {
    initWorkBook,
    setColumns,
    formatData,
    createRowFromArray
}