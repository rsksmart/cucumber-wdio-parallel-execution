'use strict';

var fs_extra = require('fs-extra');
const path = require('path');
var featureFileSplitter = require('./featureFileSplitter');
var tmpFeatureFiles = new featureFileSplitter();

/**
 * Compile and create splitted files
 * @param {string} options.sourceSpecDirectory - glob expression for sourceSpecDirectory
 * @param {string} options.tmpSpecDirectory - Path to temp folder containing the Temporary Feature Files 
 * @param {string} [options.tagExpression] - Tag expression to parse
 * @param {string} [options.ff] - Feature File Name to parse
 * @param {string} [options.lang] - Language of sourceSpecDirectory
 * @return {Promise<void>}
 */
var performSetup = function performSetup(options) {
    try {

        //Remove Tmp Spec Directory during setup & Create One
        prepareTmpDirectory(options.tmpSpecDirectory);

        //Compile and Create Split Feature Files
        tmpFeatureFiles.compile({
            sourceSpecDirectory: options.sourceSpecDirectory,
            tmpSpecDirectory: options.tmpSpecDirectory,
            tagExpression: options.tagExpression,
            ff: options.ff,
            lang: options.lang
        });
    } catch (e) {
        console.log('Error: ', e);
    }
};

function prepareTmpDirectory(directory) {
    if (fs_extra.existsSync(directory)) {
        console.log(`Cleaning existing backup directory: ${directory}`);
        fs_extra.readdirSync(directory).forEach(file => fs_extra.unlinkSync(path.join(directory, file)));
    } else {
        console.log((`Creating backup directory: ${directory}`));
        fs_extra.mkdirSync(directory);
    }
}

module.exports = performSetup;