#!/usr/bin/env node
"use strict";

const meow = require("meow");
const pkg = require("./package.json");
const toCSS = require("./index.js");

const cli = meow(
  `
  Usage
    $ ${pkg.name} <repository>

   Options
    --clipboard, -c  Copy CSS output to the OS clipboard

   Examples
    $ ${pkg.name} --clipboard https://github.com/simurai/duotone-dark-sea-syntax
    ${toCSS.clipboardSuccess}
`,
  {
    flags: {
      clipboard: {
        type: "boolean",
        alias: "c"
      }
    }
  }
);

if (!cli.input[0]) {
  cli.showHelp();
}

toCSS(cli.input[0], cli.flags);
