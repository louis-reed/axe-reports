# aXe Reports

[![Version](https://img.shields.io/npm/v/axe-reports.svg)](https://www.npmjs.com/package/axe-reports)
[![License](https://img.shields.io/npm/l/axe-reports.svg)](http://opensource.org/licenses/MIT)

Create human readable reports from the results object created by the aXe analyze function.

## Getting Started

Install aXe Reports

```
npm install axe-reports
```

### Prerequisites

Selenium WebDriver

Require

aXe Core

aXe WebDriver JavaScript

```
npm install selenium-webdriver

npm install require

npm install axe-core

npm install axe-webdriverjs
```

### Installing

Install aXe Reports

```
npm install axe-reports
```

## Usage

**Create a Results File**

Version 1.1.x supports independent results file creation

```
AxeReports.processResults(results, fileType, fileName, [createNewReport])

object results = aXe results object

string fileType = file extension (only 'csv' and 'tsv' are supported)

string fileName = name of file (i.e. test-results) without file extension

boolean createNewReport = tells file writer to start a new file or not
```

**OR**

Use a create report header row function to start a report; this creates the report header row.

```
AxeReports.createCsvReportHeaderRow();
```

**OR**

```
AxeReports.createTsvReportHeaderRow();
```

To create the rest of the report, call the create report row function passing the results object from the analyze function to create the rest of the report

```
AxeReports.createCsvReportRow(results);
```

**OR**

```
AxeReports.createTsvReportRow(results);
```

**ADDITIONALLY**

You can create an entire report with one call

```
AxeReports.createCsvReport(results);
```

**OR**

```
AxeReports.createTsvReport(results);
```

## Sample Test #1 (create a test results file)

```
var AxeBuilder = require('axe-webdriverjs'),
    AxeReports = require('axe-reports'),
    webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome') //or firefox or whichever driver you use
    .build();

var AXE_BUILDER = AxeBuilder(driver)
    .withTags(['wcag2a', 'wcag2aa']); // specify your test criteria (see aXe documentation for more info)

driver.get('https://www.google.com');
driver.wait(until.titleIs('Google'), 1000)
    .then(function () {
        AXE_BUILDER.analyze(function (results) {
            AxeReports.processResults(results, 'csv', 'test-results', true);
        });
    });
driver.get('https://www.bing.com');
driver.wait(until.titleIs('Bing'), 1000)
    .then(function () {
        AXE_BUILDER.analyze(function (results) {
            AxeReports.processResults(results, 'csv', 'test-results');
        });
    });
driver.quit();
```

## Sample Test #2 (separate row creation - useful when creating one report for multiple pages)

```
var AxeBuilder = require('axe-webdriverjs'),
    AxeReports = require('axe-reports'),
    webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome') //or firefox or whichever driver you use
    .build();

var AXE_BUILDER = AxeBuilder(driver)
    .withTags(['wcag2a', 'wcag2aa']); // specify your test criteria (see aXe documentation for more info)

AxeReports.createCsvReportHeaderRow();
driver.get('https://www.google.com');
driver.wait(until.titleIs('Google'), 1000)
    .then(function () {
        AXE_BUILDER.analyze(function (results) {
            AxeReports.createCsvReportRow(results);
        });
    });
driver.get('https://www.bing.com');
driver.wait(until.titleIs('Bing'), 1000)
    .then(function () {
        AXE_BUILDER.analyze(function (results) {
            AxeReports.createCsvReportRow(results);
        });
    });
driver.quit();
```

## Sample Test #3 (separate row creation - useful when creating one report for multiple pages and outputting to Console in a colorful visual format)

```
var AxeBuilder = require('axe-webdriverjs'),
    AxeReports = require('axe-reports'),
    webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome') //or firefox or whichever driver you use
    .build();

var AXE_BUILDER = AxeBuilder(driver)
    .withTags(['wcag2a', 'wcag2aa']); // specify your test criteria (see aXe documentation for more info)

AxeReports.createCsvReportHeaderRow();
driver.get('https://www.google.com');
driver.wait(until.titleIs('Google'), 1000)
    .then(function () {
        AXE_BUILDER.analyze(function (results) {
            AxeReports.createCsvReportRow(results); // This output will break a CSV or TSV formatting if written to a file
        });
    });
driver.get('https://www.bing.com');
driver.wait(until.titleIs('Bing'), 1000)
    .then(function () {
        AXE_BUILDER.analyze(function (results) {
            AxeReports.createConsoleReportRow(results, "light" || "dark"); // Pass string "light" to optimize for lighter console background, or pass string "dark" to optimize for darker console backgrounds.
        });
    });
driver.quit();
```

## Sample Test #4 (all-in-one test for a single page)

```
var AxeBuilder = require('axe-webdriverjs'),
    AxeReports = require('axe-reports'),
    webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome') //or firefox or whichever driver you use
    .build();

driver.get('https://www.google.com');
driver.wait(until.titleIs('Google'), 1000)
    .then(function () {
        AxeBuilder(driver)
            .withTags(['wcag2a', 'wcag2aa']); // specify your test criteria (see aXe documentation for more info)
            .analyze(function (results) {
                AxeReports.createCsvReport(results);
            });
        });
driver.quit();
```

## Usage Example

```
node csv_testname

note: you will need to use the new processResults() function
```

**OR**

```
node csv_testname => results.csv
```

**OR**

```
node tsv_testname => results.tsv
```

## Authors

**Louis Reed** - [Louis Reed](https://github.com/louis-reed)

## License

This project is licensed under the MIT License

## Acknowledgments

Thanks to [Deque](http://www.deque.com/products/aXe/) for creating and supporting aXe!
