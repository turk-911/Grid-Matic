#!/user/bin/env node
const yargs = require("yargs");
const chalk = require("chalk");
const fs = require("fs");
const { generateResponsiveGrid } = require("./gridMatic");
yargs
  .command(
    "generate",
    "Generate a CSS grid layout",
    {
      columns: {
        describe: "Number of columns in the grid",
        demandOption: true,
        type: "number",
      },
      rows: {
        describe: "Number of rows in the grid",
        demandOption: true,
        type: "number",
      },
      gap: {
        describe: "Gap between grid items: ",
        demandOption: false,
        default: "10px",
        type: "string",
      },
      output: {
        describe: "File to write generated CSS to",
        demandOption: false,
        type: "string",
      },
      breakpoints: {
        describe: "Responsive breakpoints in JSON format",
        demandOption: false,
        type: "string",
      },
    },
    (argv) => {
      const { columns, rows, gap, output, breakpoints } = argv;
      let parsedBreakpoints = {};
      if (breakpoints) {
        try {
          parsedBreakpoints = JSON.parse(breakpoints);
        } catch (error) {
          console.error(chalk.red("Invalid JSON breakpoints"));
          process.exit(1);
        }
      }
      const css = generateResponsiveGrid(columns, rows, gap, parsedBreakpoints);
      if (output) {
        fs.writeFileSync(output, css);
        console.log(chalk.green(`Grid css written to ${output}`));
      } else {
        console.log(css);
      }
    }
  )
  .help().argv;
