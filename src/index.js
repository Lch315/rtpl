import program from 'commander';
import { version } from './../package.json';
import path from 'path';
import { folderCreator, fileCreator } from './creator';

program
  .version(version)
  .usage('<component-name> [options]')
  .option('-p, --path <path>', 'component folder path')
  .option('-c, --component', 'whether it is component')
  .option('-i, --image', 'component with images folder')
  .option('-r, --redux', 'component with redux')
  .parse(process.argv);

const name = (program.args[0] || '').replace(/\w{1}/, match => match.toUpperCase());
const folderPath = path.resolve(process.cwd(), program.path || '');
const hasImages = program.image;
const data = {
  name,
  isComponent: program.component,
  needRedux: program.redux,
};
const defTask = ['index', 'jsx', 'scss'];

function create() {
  if (!data.name) {
    return program.help();
  }

  folderCreator(folderPath, name)
    .then(() => {
      const folderBasePath = path.resolve(folderPath, name);
      const fileTasks = defTask.map(item => fileCreator(folderBasePath, data, item));

      if (hasImages) {
        fileTasks.push(folderCreator(folderBasePath, 'images'));
      }

      return Promise.all(fileTasks);
    })
    .then(() => console.log('success'))
    .catch(err => console.error(err));
}

create();
