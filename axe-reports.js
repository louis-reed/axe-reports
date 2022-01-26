var FILE_TYPE = {
    csv: 'csv',
    tsv: 'tsv'
}; 

var fs = require('fs');

exports.createBasicReport = function (results) {
    var any,
        anyCount,
        anys,
        displayNumber,
        i,
        j,
        k,
        node,
        nodeCount,
        nodes,
        target,
        targetCount,
        targets,
        url = results.url,
        violation,
        violationCount,
        violations = results.violations;

    if (typeof violations !== 'undefined') {
        violationCount = violations.length;
        console.log('----------------------------------------------------------------------' +
            '----------');

        if (violationCount > 0) {

            violationCount > 1 ?
                console.log('There are ' + violationCount + ' violation types on URL: ' + url) :
                console.log('There is one violation type on URL: ' + url);

            console.log('----------------------------------------------------------------------' +
                '----------');

            for (i = 0; i < violationCount; i += 1) {
                violation = violations[i];
                nodes = violation.nodes;

                if (typeof nodes !== 'undefined') {
                    nodeCount = nodes.length;

                    nodeCount > 1 ?
                        console.log('There are ' + nodeCount + ' instances of the following violation type: ' + violation.id) :
                        console.log('There is one instance of the following violation type: ' + violation.id);

                    console.log('Help is available here: ' + violation.helpUrl);

                    for (j = 0; j < nodeCount; j += 1) {
                        node = nodes[j];

                        if (typeof node !== 'undefined') {
                            console.log('\n');
                            console.log('\tHTML Element: ' + node.html);
                            anys = node.any;
                            targets = node.target;

                            if (typeof anys !== 'undefined') {
                                anyCount = anys.length;

                                for (k = 0; k < anyCount; k += 1) {
                                    displayNumber = k + 1;
                                    any = anys[k];
                                    console.log('\tMessage ' + displayNumber + ': ' + any.message);
                                }
                            }

                            if (typeof targets !== 'undefined') {
                                targetCount = targets.length;

                                for (k = 0; k < targetCount; k += 1) {
                                    target = targets[k];
                                    console.log('\tDOM Element: ' + target);
                                }
                            }
                        }
                    }
                    console.log('----------------------------------------------------------------------' +
                        '----------');
                }
            }

            console.log('    End of violations on: ' + url);
            console.log('----------------------------------------------------------------------' +
                '----------');
        } else {
            console.log('    No violations found on: ' + url);
            console.log('----------------------------------------------------------------------' +
                '----------');
        }
    }
};

exports.createTsvReportHeaderRow = function () {
    console.log('URL\tViolation Type\tImpact\tHelp\tHTML Element\tMessages\tDOM Element\r');
};

exports.createCsvReportHeaderRow = function () {
    console.log('URL,Violation Type,Impact,Help,HTML Element,Messages,DOM Element\r');
};

exports.createTsvReportRow = function (results) {
    var any,
        anyCount,
        anys,
        i,
        j,
        k,
        node,
        nodeCount,
        nodes,
        outputRow = '',
        outputRowPrefix = '',
        target,
        targetCount,
        targets,
        url = results.url,
        violation,
        violationCount,
        violations = results.violations;

    if (typeof violations !== 'undefined') {
        violationCount = violations.length;

        if (violationCount > 0) {
            for (i = 0; i < violationCount; i += 1) {
                violation = violations[i];
                nodes = violation.nodes;

                if (typeof nodes !== 'undefined') {
                    outputRow += url + '\t' + violation.id + '\t' + violation.impact + '\t' + violation.helpUrl;
                    outputRowPrefix = outputRow;
                    nodeCount = nodes.length;

                    for (j = 0; j < nodeCount; j += 1) {
                        node = nodes[j];

                        if (typeof node !== 'undefined') {
                            if (j !== 0) {
                                outputRow = outputRowPrefix;
                            }

                            outputRow += '\t' + node.html + '\t';
                            anys = node.any;
                            targets = node.target;

                            if (typeof anys !== 'undefined') {
                                anyCount = anys.length;

                                for (k = 0; k < anyCount; k += 1) {
                                    if (k !== 0) {
                                        outputRow += '--';
                                    }

                                    any = anys[k];
                                    outputRow += any.message;
                                }
                            }

                            outputRow += '\t';

                            if (typeof targets !== 'undefined') {
                                targetCount = targets.length;

                                for (k = 0; k < targetCount; k += 1) {
                                    if (k !== 0) {
                                        outputRow += '--';
                                    }

                                    target = targets[k];
                                    outputRow += target;
                                }
                            }

                            outputRow = outputRow.replace(/(\r\n|\n|\r)/gm,'');
                            console.log(outputRow + '\r');
                            outputRow = '';
                        }
                    }
                }
                outputRowPrefix = '';
            }
        } 
    }
};

exports.createTsvReport = function (results) {
    var any,
        anyCount,
        anys,
        i,
        j,
        k,
        node,
        nodeCount,
        nodes,
        outputRow = '',
        outputRowPrefix = '',
        target,
        targetCount,
        targets,
        url = results.url,
        violation,
        violationCount,
        violations = results.violations;

    console.log('URL\tViolation Type\tImpact\tHelp\tHTML Element\tMessages\tDOM Element\r');

    if (typeof violations !== 'undefined') {
        violationCount = violations.length;

        if (violationCount > 0) {
            for (i = 0; i < violationCount; i += 1) {
                violation = violations[i];
                nodes = violation.nodes;

                if (typeof nodes !== 'undefined') {
                    outputRow += url + '\t' + violation.id + '\t' + violation.impact + '\t' + violation.helpUrl;
                    outputRowPrefix = outputRow;
                    nodeCount = nodes.length;

                    for (j = 0; j < nodeCount; j += 1) {
                        node = nodes[j];

                        if (typeof node !== 'undefined') {
                            if (j !== 0) {
                                outputRow = outputRowPrefix;
                            }

                            outputRow += '\t' + node.html + '\t';
                            anys = node.any;
                            targets = node.target;

                            if (typeof anys !== 'undefined') {
                                anyCount = anys.length;

                                for (k = 0; k < anyCount; k += 1) {
                                    if (k !== 0) {
                                        outputRow += '--';
                                    }

                                    any = anys[k];
                                    outputRow += any.message;
                                }
                            }

                            outputRow += '\t';

                            if (typeof targets !== 'undefined') {
                                targetCount = targets.length;

                                for (k = 0; k < targetCount; k += 1) {
                                    if (k !== 0) {
                                        outputRow += '--';
                                    }

                                    target = targets[k];
                                    outputRow += target;
                                }
                            }

                            outputRow = outputRow.replace(/(\r\n|\n|\r)/gm,'');
                            console.log(outputRow + '\r');
                            outputRow = '';
                        }
                    }
                }
                outputRowPrefix = '';
            }
        } 
    }
};

exports.createCsvReportRow = function (results) {
    var any,
        anyCount,
        anys,
        i,
        j,
        k,
        node,
        nodeCount,
        nodes,
        outputRow = '',
        outputRowPrefix = '',
        target,
        targetCount,
        targets,
        url = results.url,
        violation,
        violationCount,
        violations = results.violations;

    if (typeof violations !== 'undefined') {
        violationCount = violations.length;

        if (violationCount > 0) {
            for (i = 0; i < violationCount; i += 1) {
                violation = violations[i];
                nodes = violation.nodes;

                if (typeof nodes !== 'undefined') {
                    outputRow += url.replace(/,/g , '-') + ',' + violation.id.replace(/,/g , '-') + ',' + violation.impact.replace(/,/g , '-') + ',' + violation.helpUrl.replace(/,/g , '-');
                    outputRowPrefix = outputRow;
                    nodeCount = nodes.length;

                    for (j = 0; j < nodeCount; j += 1) {
                        node = nodes[j];

                        if (typeof node !== 'undefined') {
                            if (j !== 0) {
                                outputRow = outputRowPrefix;
                            }

                            outputRow += ',' + node.html.replace(/,/g , '-') + ',';
                            anys = node.any;
                            targets = node.target;

                            if (typeof anys !== 'undefined') {
                                anyCount = anys.length;

                                for (k = 0; k < anyCount; k += 1) {
                                    if (k !== 0) {
                                        outputRow += '--';
                                    }

                                    any = anys[k];
                                    outputRow += any.message.replace(/,/g , '-');
                                }
                            }

                            outputRow += ',';

                            if (typeof targets !== 'undefined') {
                                targetCount = targets.length;

                                for (k = 0; k < targetCount; k += 1) {
                                    if (k !== 0) {
                                        outputRow += '--';
                                    }

                                    target = targets[k];
                                    outputRow += target.replace(/,/g , '-');
                                }
                            }

                            outputRow = outputRow.replace(/(\r\n|\n|\r)/gm,'');
                            console.log(outputRow + '\r');
                            outputRow = '';
                        }
                    }
                }
                outputRowPrefix = '';
            }
        } 
    }
};

exports.createCsvReport = function (results) {
    var any,
        anyCount,
        anys,
        i,
        j,
        k,
        node,
        nodeCount,
        nodes,
        outputRow = '',
        outputRowPrefix = '',
        target,
        targetCount,
        targets,
        url = results.url,
        violation,
        violationCount,
        violations = results.violations;

    console.log('URL,Violation Type,Impact,Help,HTML Element,Messages,DOM Element\r');

    if (typeof violations !== 'undefined') {
        violationCount = violations.length;

        if (violationCount > 0) {
            for (i = 0; i < violationCount; i += 1) {
                violation = violations[i];
                nodes = violation.nodes;

                if (typeof nodes !== 'undefined') {
                    outputRow += url.replace(/,/g , '-') + ',' + violation.id.replace(/,/g , '-') + ',' + violation.impact.replace(/,/g , '-') + ',' + violation.helpUrl.replace(/,/g , '-');
                    outputRowPrefix = outputRow;
                    nodeCount = nodes.length;

                    for (j = 0; j < nodeCount; j += 1) {
                        node = nodes[j];

                        if (typeof node !== 'undefined') {
                            if (j !== 0) {
                                outputRow = outputRowPrefix;
                            }

                            outputRow += ',' + node.html.replace(/,/g , '-') + ',';
                            anys = node.any;
                            targets = node.target;

                            if (typeof anys !== 'undefined') {
                                anyCount = anys.length;

                                for (k = 0; k < anyCount; k += 1) {
                                    if (k !== 0) {
                                        outputRow += '--';
                                    }

                                    any = anys[k];
                                    outputRow += any.message.replace(/,/g , '-');
                                }
                            }

                            outputRow += ',';

                            if (typeof targets !== 'undefined') {
                                targetCount = targets.length;

                                for (k = 0; k < targetCount; k += 1) {
                                    if (k !== 0) {
                                        outputRow += '--';
                                    }

                                    target = targets[k];
                                    outputRow += target.replace(/,/g , '-');
                                }
                            }

                            outputRow = outputRow.replace(/(\r\n|\n|\r)/gm,'');
                            console.log(outputRow + '\r');
                            outputRow = '';
                        }
                    }
                }
                outputRowPrefix = '';
            }
        } 
    }
};

exports.processResults = function (results, fileType, fileName, createNewReport) {
    var any,
        anyCount,
        anys,
        delimiter,
        i,
        j,
        k,
        node,
        nodeCount,
        nodes,
        outputRow = '',
        outputRowPrefix = '',
        target,
        targetCount,
        targets,
        url = results.url,
        violation,
        violationCount,
        violations = results.violations;

    if (FILE_TYPE.csv === fileType) {
        delimiter = ',';
        fileName += '.' + FILE_TYPE.csv;
    } else if (FILE_TYPE.tsv === fileType) {
        delimiter = '\t';
        fileName += '.' + FILE_TYPE.tsv;
    } else {
        console.log('ERROR - Please supply a valid file type. Currently, only \'csv\' and \'tsv\' are supported.');
        return undefined;
    }

    if (!fileName) {
        console.log('ERROR - Please supply a file name (i.e. my-report)');
        return undefined;
    }

    if (createNewReport) {
        outputRow = ('URL' + delimiter + 'Violation Type' + delimiter + 'Impact' + delimiter + 'Help'
                    + delimiter + 'HTML Element' + delimiter + 'Messages' + delimiter +  'DOM Element\r');
        fs.writeFile(fileName, outputRow, (err) => {
            if (err) throw err;
        });
        outputRow = '';
    }

    if (typeof violations !== 'undefined') {
        violationCount = violations.length;

        if (violationCount > 0) {
            for (i = 0; i < violationCount; i += 1) {
                violation = violations[i];
                nodes = violation.nodes;

                if (typeof nodes !== 'undefined') {
                    outputRow += url.replace(/,/g , '-') + delimiter + violation.id.replace(/,/g , '-') + delimiter + violation.impact.replace(/,/g , '-')
                                 + delimiter + violation.helpUrl.replace(/,/g , '-');
                    outputRowPrefix = outputRow;
                    nodeCount = nodes.length;

                    for (j = 0; j < nodeCount; j += 1) {
                        node = nodes[j];

                        if (typeof node !== 'undefined') {
                            if (j !== 0) {
                                outputRow = outputRowPrefix;
                            }

                            outputRow += delimiter + node.html.replace(/,/g , '-') + delimiter;
                            anys = node.any;
                            targets = node.target;

                            if (typeof anys !== 'undefined') {
                                anyCount = anys.length;

                                for (k = 0; k < anyCount; k += 1) {
                                    if (k !== 0) {
                                        outputRow += '--';
                                    }

                                    any = anys[k];
                                    outputRow += any.message.replace(/,/g , '-');
                                }
                            }

                            outputRow += delimiter;

                            if (typeof targets !== 'undefined') {
                                targetCount = targets.length;

                                for (k = 0; k < targetCount; k += 1) {
                                    if (k !== 0) {
                                        outputRow += '--';
                                    }

                                    target = targets[k];
                                    outputRow += target.replace(/,/g , '-');
                                }
                            }

                            outputRow = outputRow.replace(/(\r\n|\n|\r)/gm,'');
                            fs.appendFile(fileName, outputRow + '\r', (err) => {
                              if (err) throw err;
                            });
                            outputRow = '';
                        }
                    }
                }
                outputRowPrefix = '';
            }
        } 
    }
};
