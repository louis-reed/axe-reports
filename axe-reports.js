var FILE_TYPE = {
  csv: "csv",
  tsv: "tsv"
};

var fs = require("fs");
var chalk = require("chalk");

exports.createBasicReport = function(results) {
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

  if (typeof violations !== "undefined") {
    violationCount = violations.length;
    console.log(
      "----------------------------------------------------------------------" +
        "----------"
    );

    if (violationCount > 0) {
      violationCount > 1
        ? console.log(
            "There are " + violationCount + " violation types on URL: " + url
          )
        : console.log("There is one violation type on URL: " + url);

      console.log(
        "----------------------------------------------------------------------" +
          "----------"
      );

      for (i = 0; i < violationCount; i += 1) {
        violation = violations[i];
        nodes = violation.nodes;

        if (typeof nodes !== "undefined") {
          nodeCount = nodes.length;

          nodeCount > 1
            ? console.log(
                "There are " +
                  nodeCount +
                  " instances of the following violation type: " +
                  violation.id
              )
            : console.log(
                "There is one instance of the following violation type: " +
                  violation.id
              );

          console.log("Help is available here: " + violation.helpUrl);

          for (j = 0; j < nodeCount; j += 1) {
            node = nodes[j];

            if (typeof node !== "undefined") {
              console.log("\n");
              console.log("\tHTML Element: " + node.html);
              anys = node.any;
              targets = node.target;

              if (typeof anys !== "undefined") {
                anyCount = anys.length;

                for (k = 0; k < anyCount; k += 1) {
                  displayNumber = k + 1;
                  any = anys[k];
                  console.log(
                    "\tMessage " + displayNumber + ": " + any.message
                  );
                }
              }

              if (typeof targets !== "undefined") {
                targetCount = targets.length;

                for (k = 0; k < targetCount; k += 1) {
                  target = targets[k];
                  console.log("\tDOM Element: " + target);
                }
              }
            }
          }
          console.log(
            "----------------------------------------------------------------------" +
              "----------"
          );
        }
      }

      console.log("    End of violations on: " + url);
      console.log(
        "----------------------------------------------------------------------" +
          "----------"
      );
    } else {
      console.log("    No violations found on: " + url);
      console.log(
        "----------------------------------------------------------------------" +
          "----------"
      );
    }
  }
};

exports.createTsvReportHeaderRow = function() {
  console.log(
    "URL\tVolation Type\tImpact\tHelp\tHTML Element\tMessages\tDOM Element\r"
  );
};

exports.createCsvReportHeaderRow = function() {
  console.log(
    "URL,Volation Type,Impact,Help,HTML Element,Messages,DOM Element\r"
  );
};

exports.createTsvReportRow = function(results) {
  var any,
    anyCount,
    anys,
    i,
    j,
    k,
    node,
    nodeCount,
    nodes,
    outputRow = "",
    outputRowPrefix = "",
    target,
    targetCount,
    targets,
    url = results.url,
    violation,
    violationCount,
    violations = results.violations;

  if (typeof violations !== "undefined") {
    violationCount = violations.length;

    if (violationCount > 0) {
      for (i = 0; i < violationCount; i += 1) {
        violation = violations[i];
        nodes = violation.nodes;

        if (typeof nodes !== "undefined") {
          outputRow +=
            url +
            "\t" +
            violation.id +
            "\t" +
            violation.impact +
            "\t" +
            violation.helpUrl;
          outputRowPrefix = outputRow;
          nodeCount = nodes.length;

          for (j = 0; j < nodeCount; j += 1) {
            node = nodes[j];

            if (typeof node !== "undefined") {
              if (j !== 0) {
                outputRow = outputRowPrefix;
              }

              outputRow += "\t" + node.html + "\t";
              anys = node.any;
              targets = node.target;

              if (typeof anys !== "undefined") {
                anyCount = anys.length;

                for (k = 0; k < anyCount; k += 1) {
                  if (k !== 0) {
                    outputRow += "--";
                  }

                  any = anys[k];
                  outputRow += any.message;
                }
              }

              outputRow += "\t";

              if (typeof targets !== "undefined") {
                targetCount = targets.length;

                for (k = 0; k < targetCount; k += 1) {
                  if (k !== 0) {
                    outputRow += "--";
                  }

                  target = targets[k];
                  outputRow += target;
                }
              }

              outputRow = outputRow.replace(/(\r\n|\n|\r)/gm, "");
              console.log(outputRow + "\r");
              outputRow = "";
            }
          }
        }
        outputRowPrefix = "";
      }
    }
  }
};

exports.createTsvReport = function(results) {
  var any,
    anyCount,
    anys,
    i,
    j,
    k,
    node,
    nodeCount,
    nodes,
    outputRow = "",
    outputRowPrefix = "",
    target,
    targetCount,
    targets,
    url = results.url,
    violation,
    violationCount,
    violations = results.violations;

  console.log(
    "URL\tVolation Type\tImpact\tHelp\tHTML Element\tMessages\tDOM Element\r"
  );

  if (typeof violations !== "undefined") {
    violationCount = violations.length;

    if (violationCount > 0) {
      for (i = 0; i < violationCount; i += 1) {
        violation = violations[i];
        nodes = violation.nodes;

        if (typeof nodes !== "undefined") {
          outputRow +=
            url +
            "\t" +
            violation.id +
            "\t" +
            violation.impact +
            "\t" +
            violation.helpUrl;
          outputRowPrefix = outputRow;
          nodeCount = nodes.length;

          for (j = 0; j < nodeCount; j += 1) {
            node = nodes[j];

            if (typeof node !== "undefined") {
              if (j !== 0) {
                outputRow = outputRowPrefix;
              }

              outputRow += "\t" + node.html + "\t";
              anys = node.any;
              targets = node.target;

              if (typeof anys !== "undefined") {
                anyCount = anys.length;

                for (k = 0; k < anyCount; k += 1) {
                  if (k !== 0) {
                    outputRow += "--";
                  }

                  any = anys[k];
                  outputRow += any.message;
                }
              }

              outputRow += "\t";

              if (typeof targets !== "undefined") {
                targetCount = targets.length;

                for (k = 0; k < targetCount; k += 1) {
                  if (k !== 0) {
                    outputRow += "--";
                  }

                  target = targets[k];
                  outputRow += target;
                }
              }

              outputRow = outputRow.replace(/(\r\n|\n|\r)/gm, "");
              console.log(outputRow + "\r");
              outputRow = "";
            }
          }
        }
        outputRowPrefix = "";
      }
    }
  }
};

exports.createConsoleReportRow = function(results, consoleColor) {
  var any,
    anyCount,
    anys,
    i,
    j,
    k,
    node,
    nodeCount,
    nodes,
    outputRow = "",
    outputRowPrefix = "",
    target,
    targetCount,
    targets,
    url = results.url,
    violation,
    violationCount,
    violations = results.violations;

  if (typeof violations !== "undefined") {
    violationCount = violations.length;

    if (violationCount > 0) {
      if (consoleColor === "dark") {
        for (i = 0; i < violationCount; i += 1) {
          violation = violations[i];
          nodes = violation.nodes;

          if (typeof nodes !== "undefined") {
            console.log(
              "----------------------------------------------------------------------------------------------------"
            );
            console.log(
              chalk.bgKeyword("lightblue").keyword("black")(
                "Resource URL: " + url.replace(/,/g, "-")
              )
            );
            console.log(
              "----------------------------------------------------------------------------------------------------"
            );
            console.log(
              chalk.keyword("palevioletred")("Violation Type:   "),
              chalk.keyword("palevioletred")(
                "|  " + violation.id.replace(/,/g, "-")
              )
            );
            console.log(
              chalk.keyword("palevioletred")("Violation Impact: "),
              chalk.keyword("palevioletred")(
                "|  " + violation.impact.replace(/,/g, "-")
              )
            );
            console.log(
              chalk.keyword("palevioletred")("Help Resource:    "),
              chalk.keyword("palevioletred")(
                "|  " + violation.helpUrl.replace(/,/g, "-")
              )
            );

            nodeCount = nodes.length;

            for (j = 0; j < nodeCount; j += 1) {
              node = nodes[j];

              if (typeof node !== "undefined") {
                if (j !== 0) {
                  outputRow = outputRowPrefix;
                }

                console.log(
                  chalk.keyword("palevioletred")("HTML Element:     "),
                  chalk.keyword("palevioletred")(
                    "|  " + node.html.replace(/,/g, "-")
                  )
                );

                anys = node.any;
                targets = node.target;

                if (typeof anys !== "undefined") {
                  anyCount = anys.length;

                  for (k = 0; k < anyCount; k += 1) {
                    any = anys[k];
                    console.log(
                      chalk.keyword("palevioletred")("Messages:         "),
                      chalk.keyword("palevioletred")(
                        "|  " + any.message.replace(/,/g, "-")
                      )
                    );
                  }
                }

                if (typeof targets !== "undefined") {
                  targetCount = targets.length;

                  for (k = 0; k < targetCount; k += 1) {
                    target = targets[k];
                    console.log(
                      chalk.keyword("palevioletred")("DOM Element:      "),
                      chalk.keyword("palevioletred")(
                        "|  " + target.replace(/,/g, "-")
                      )
                    );
                  }
                }
                console.log("\r\n");
              }
            }
          }
        }
      }

      if (consoleColor === "light") {
        for (i = 0; i < violationCount; i += 1) {
          violation = violations[i];
          nodes = violation.nodes;

          if (typeof nodes !== "undefined") {
            console.log(
              "----------------------------------------------------------------------------------------------------"
            );
            console.log(
              chalk.keyword("black")("Resource URL: " + url.replace(/,/g, "-"))
            );
            console.log(
              "----------------------------------------------------------------------------------------------------"
            );
            console.log(
              chalk.keyword("firebrick")("Violation Type:   "),
              chalk.keyword("firebrick")(
                "|  " + violation.id.replace(/,/g, "-")
              )
            );
            console.log(
              chalk.keyword("firebrick")("Violation Impact: "),
              chalk.keyword("firebrick")(
                "|  " + violation.impact.replace(/,/g, "-")
              )
            );
            console.log(
              chalk.keyword("firebrick")("Help Resource:    "),
              chalk.keyword("firebrick")(
                "|  " + violation.helpUrl.replace(/,/g, "-")
              )
            );

            nodeCount = nodes.length;

            for (j = 0; j < nodeCount; j += 1) {
              node = nodes[j];

              if (typeof node !== "undefined") {
                if (j !== 0) {
                  outputRow = outputRowPrefix;
                }

                console.log(
                  chalk.keyword("firebrick")("HTML Element:     "),
                  chalk.keyword("firebrick")(
                    "|  " + node.html.replace(/,/g, "-")
                  )
                );

                anys = node.any;
                targets = node.target;

                if (typeof anys !== "undefined") {
                  anyCount = anys.length;

                  for (k = 0; k < anyCount; k += 1) {
                    any = anys[k];
                    console.log(
                      chalk.keyword("firebrick")("Messages:         "),
                      chalk.keyword("firebrick")(
                        "|  " + any.message.replace(/,/g, "-")
                      )
                    );
                  }
                }

                if (typeof targets !== "undefined") {
                  targetCount = targets.length;

                  for (k = 0; k < targetCount; k += 1) {
                    target = targets[k];
                    console.log(
                      chalk.keyword("firebrick")("DOM Element:      "),
                      chalk.keyword("firebrick")(
                        "|  " + target.replace(/,/g, "-")
                      )
                    );
                  }
                }
                console.log("\r\n");
              }
            }
          }
        }
      }
    }
  } else {
    console.log(
      chalk.keyword("lightblue")("Congratulations! No a11y violations found")
    );
  }
};

exports.createCsvReportRow = function(results) {
  var any,
    anyCount,
    anys,
    i,
    j,
    k,
    node,
    nodeCount,
    nodes,
    outputRow = "",
    outputRowPrefix = "",
    target,
    targetCount,
    targets,
    url = results.url,
    violation,
    violationCount,
    violations = results.violations;

  if (typeof violations !== "undefined") {
    violationCount = violations.length;

    if (violationCount > 0) {
      for (i = 0; i < violationCount; i += 1) {
        violation = violations[i];
        nodes = violation.nodes;

        if (typeof nodes !== "undefined") {
          outputRow +=
            url.replace(/,/g, "-") +
            "," +
            violation.id.replace(/,/g, "-") +
            "," +
            violation.impact.replace(/,/g, "-") +
            "," +
            violation.helpUrl.replace(/,/g, "-");
          outputRowPrefix = outputRow;
          nodeCount = nodes.length;

          for (j = 0; j < nodeCount; j += 1) {
            node = nodes[j];

            if (typeof node !== "undefined") {
              if (j !== 0) {
                outputRow = outputRowPrefix;
              }

              outputRow += "," + node.html.replace(/,/g, "-") + ",";
              anys = node.any;
              targets = node.target;

              if (typeof anys !== "undefined") {
                anyCount = anys.length;

                for (k = 0; k < anyCount; k += 1) {
                  if (k !== 0) {
                    outputRow += "--";
                  }

                  any = anys[k];
                  outputRow += any.message.replace(/,/g, "-");
                }
              }

              outputRow += ",";

              if (typeof targets !== "undefined") {
                targetCount = targets.length;

                for (k = 0; k < targetCount; k += 1) {
                  if (k !== 0) {
                    outputRow += "--";
                  }

                  target = targets[k];
                  outputRow += target.replace(/,/g, "-");
                }
              }

              outputRow = outputRow.replace(/(\r\n|\n|\r)/gm, "");
              console.log(outputRow + "\r");
              outputRow = "";
            }
          }
        }
        outputRowPrefix = "";
      }
    }
  }
};

exports.createCsvReport = function(results) {
  var any,
    anyCount,
    anys,
    i,
    j,
    k,
    node,
    nodeCount,
    nodes,
    outputRow = "",
    outputRowPrefix = "",
    target,
    targetCount,
    targets,
    url = results.url,
    violation,
    violationCount,
    violations = results.violations;

  console.log(
    "URL,Volation Type,Impact,Help,HTML Element,Messages,DOM Element\r"
  );

  if (typeof violations !== "undefined") {
    violationCount = violations.length;

    if (violationCount > 0) {
      for (i = 0; i < violationCount; i += 1) {
        violation = violations[i];
        nodes = violation.nodes;

        if (typeof nodes !== "undefined") {
          outputRow +=
            url.replace(/,/g, "-") +
            "," +
            violation.id.replace(/,/g, "-") +
            "," +
            violation.impact.replace(/,/g, "-") +
            "," +
            violation.helpUrl.replace(/,/g, "-");
          outputRowPrefix = outputRow;
          nodeCount = nodes.length;

          for (j = 0; j < nodeCount; j += 1) {
            node = nodes[j];

            if (typeof node !== "undefined") {
              if (j !== 0) {
                outputRow = outputRowPrefix;
              }

              outputRow += "," + node.html.replace(/,/g, "-") + ",";
              anys = node.any;
              targets = node.target;

              if (typeof anys !== "undefined") {
                anyCount = anys.length;

                for (k = 0; k < anyCount; k += 1) {
                  if (k !== 0) {
                    outputRow += "--";
                  }

                  any = anys[k];
                  outputRow += any.message.replace(/,/g, "-");
                }
              }

              outputRow += ",";

              if (typeof targets !== "undefined") {
                targetCount = targets.length;

                for (k = 0; k < targetCount; k += 1) {
                  if (k !== 0) {
                    outputRow += "--";
                  }

                  target = targets[k];
                  outputRow += target.replace(/,/g, "-");
                }
              }

              outputRow = outputRow.replace(/(\r\n|\n|\r)/gm, "");
              console.log(outputRow + "\r");
              outputRow = "";
            }
          }
        }
        outputRowPrefix = "";
      }
    }
  }
};

exports.processResults = function(
  results,
  fileType,
  fileName,
  createNewReport
) {
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
    outputRow = "",
    outputRowPrefix = "",
    target,
    targetCount,
    targets,
    url = results.url,
    violation,
    violationCount,
    violations = results.violations;

  if (FILE_TYPE.csv === fileType) {
    delimiter = ",";
    fileName += "." + FILE_TYPE.csv;
  } else if (FILE_TYPE.tsv === fileType) {
    delimiter = "\t";
    fileName += "." + FILE_TYPE.tsv;
  } else {
    console.log(
      "ERROR - Please supply a valid file type. Currently, only 'csv' and 'tsv' are supported."
    );
    return undefined;
  }

  if (!fileName) {
    console.log("ERROR - Please supply a file name (i.e. my-report)");
    return undefined;
  }

  if (createNewReport) {
    outputRow =
      "URL" +
      delimiter +
      "Volation Type" +
      delimiter +
      "Impact" +
      delimiter +
      "Help" +
      delimiter +
      "HTML Element" +
      delimiter +
      "Messages" +
      delimiter +
      "DOM Element\r";
    fs.writeFile(fileName, outputRow);
    outputRow = "";
  }

  if (typeof violations !== "undefined") {
    violationCount = violations.length;

    if (violationCount > 0) {
      for (i = 0; i < violationCount; i += 1) {
        violation = violations[i];
        nodes = violation.nodes;

        if (typeof nodes !== "undefined") {
          outputRow +=
            url.replace(/,/g, "-") +
            delimiter +
            violation.id.replace(/,/g, "-") +
            delimiter +
            violation.impact.replace(/,/g, "-") +
            delimiter +
            violation.helpUrl.replace(/,/g, "-");
          outputRowPrefix = outputRow;
          nodeCount = nodes.length;

          for (j = 0; j < nodeCount; j += 1) {
            node = nodes[j];

            if (typeof node !== "undefined") {
              if (j !== 0) {
                outputRow = outputRowPrefix;
              }

              outputRow += delimiter + node.html.replace(/,/g, "-") + delimiter;
              anys = node.any;
              targets = node.target;

              if (typeof anys !== "undefined") {
                anyCount = anys.length;

                for (k = 0; k < anyCount; k += 1) {
                  if (k !== 0) {
                    outputRow += "--";
                  }

                  any = anys[k];
                  outputRow += any.message.replace(/,/g, "-");
                }
              }

              outputRow += delimiter;

              if (typeof targets !== "undefined") {
                targetCount = targets.length;

                for (k = 0; k < targetCount; k += 1) {
                  if (k !== 0) {
                    outputRow += "--";
                  }

                  target = targets[k];
                  outputRow += target.replace(/,/g, "-");
                }
              }

              outputRow = outputRow.replace(/(\r\n|\n|\r)/gm, "");
              fs.appendFile(fileName, outputRow + "\r");
              outputRow = "";
            }
          }
        }
        outputRowPrefix = "";
      }
    }
  }
};
