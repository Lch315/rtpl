import fs from 'fs';
import ejs from 'ejs';
import path from 'path';

const templates = path.resolve(__dirname, './../template');

export const folderCreator = (basePath, name) => new Promise((resolve, reject) => {
  fs.mkdir(path.resolve(basePath, name), err => err ? reject(err) : resolve());
});

export const fileCreator = (basePath, data, tplType) => {
  const filePath = path.resolve(basePath, tplType === 'index' ? 'index.js' : `${data.name}.${tplType}`);
  const tplPath = path.resolve(templates, `${tplType}.tpl`);

  return new Promise((resolve, reject) => {
    ejs.renderFile(tplPath, data, (err, str) => {
      if (err) {
        return reject(err);
      }

      fs.writeFile(filePath, str, err => err ? reject(err) : resolve(err));
    });
  });
};
