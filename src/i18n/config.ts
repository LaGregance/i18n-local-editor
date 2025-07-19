import * as fs from 'node:fs';
import path from 'node:path';

export type EditorConfig = {
  locales: string[];
  defaultLocale: string;
  namespaces: string[];
  pathToFiles: string;
  keyFile: string;
  fileType: 'json'; // | 'js' | 'ts';
};

export const EDITOR_CONFIG: EditorConfig = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'i18n-local-editor.json'), { encoding: 'utf8' })
);
