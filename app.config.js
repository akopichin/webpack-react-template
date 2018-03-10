const path = require('path');

const sourceDir = path.resolve('src');
const outputDir = path.resolve('dist');

module.exports = {
    sourceDir: sourceDir,
    outputDir: outputDir,
    assetsDir: path.join(sourceDir, 'assets'),
};