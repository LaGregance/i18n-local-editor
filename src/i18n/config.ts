import * as fs from 'node:fs';
import path from 'node:path';

import { getPWD } from '@/shared/get-pwd';

export type EditorConfig = {
  locales: string[];
  defaultLocale: string;
  namespaces: string[];
  defaultNamespace: string;
  pathToFiles: string;
  keyFile: string;
  fileType: 'json'; // | 'js' | 'ts';
};

export const getEditorConfig = (): EditorConfig => {
  return JSON.parse(fs.readFileSync(path.join(getPWD(), 'i18n-local-editor.json'), { encoding: 'utf8' }));
};
