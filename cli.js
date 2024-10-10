#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";
import fs from "fs";

yargs(hideBin(process.argv))
  .command(
    "generate",
    "Generate a CSS grid",
    {
      columns: {
        type: "number",
        describe: "Number of columns",
        demandOption: true,
      },
      rows: {
        type: "number",
        describe: "Number of rows",
        demandOption: true,
      },
      gap: {
        type: "string",
        describe: "Gap between grid items",
        demandOption: true,
      },
      output: {
        type: "string",
        describe: "Output file for the generated CSS",
        demandOption: true,
      },
    },
    function (argv) {
      const gridCss = `
        .grid-container {
          display: grid;  
          grid-template-columns: repeat(${argv.columns}, 1fr);
          grid-template-rows: repeat(${argv.rows}, auto);
          gap: ${argv.gap};
        }
      `;

      fs.writeFileSync(argv.output, gridCss);

      console.log(
        chalk.green(`CSS grid successfully generated in ${argv.output}`)
      );
    }
  )
  .help().argv;
