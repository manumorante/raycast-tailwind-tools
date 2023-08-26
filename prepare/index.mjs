import paths from "./paths.mjs";
import { parse } from "./parse.mjs";
import _ from "./msg.mjs";
import { readFileSync, writeFileSync } from "fs";
import { promisify } from 'util';
import { exec } from 'child_process';

const execPromise = promisify(exec);

_.info('Tailwind Tools\n');

_.log('Generating CSS');
try {
  await execPromise(`npx tailwindcss -c ${paths.config} -i ${paths.inputCss} -o ${paths.outputCss}`);
  _.note(`${paths.outputCss} file created`);
  _.success(`ok\n`);
} catch (err) {
  _.error('Error generating CSS output file.', err);  
}

_.log('Reading generated file');
let css;
try {
  css = readFileSync(paths.outputCss, "utf8");
  _.note(`${paths.outputCss} file read`);
  _.success(`ok\n`);
} catch (err) {
  _.error('Error reading generated CSS file.', err);
}

_.log('Parsing CSS to JSON');
let parsedCSS;
try {
  parsedCSS = parse(css);
  _.note(`${parsedCSS.length} data parsed`);
  _.success('ok\n');
} catch (err) {
  _.error('Error parsing CSS to JSON.', err);
}

_.log('Saving JSON file...');
try {
  writeFileSync(paths.buildJson, JSON.stringify(parsedCSS));
  _.note(`${paths.buildJson} saved`);
  _.success(`ok\n`);
} catch (err) {
  _.error('Error saving JSON file.', err);
}

_.info('Run `npm run dev` to check the result!\n');
