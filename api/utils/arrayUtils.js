const findMaxColumnSize = (data) => {
    let max = data[0].content.length;

    for (let col of data) {
        if (max < col.content.length) {
            max = col.content.length;
        }
    }

    return max;
}

module.exports = {
    findMaxColumnSize
}
