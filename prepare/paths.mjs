import { join, dirname } from 'path';
const __dirname = dirname('../')

const paths = {
  config: join(__dirname, '/data/tailwind.config.js'),
  inputCss: join(__dirname, '/data/input.css'),
  outputCss: join(__dirname, '/data/build.css'),
  buildJson: join(__dirname, '/data/utilities.json')
}

export default paths;