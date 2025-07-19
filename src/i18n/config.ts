export type EditorConfig = {
  locales: string[];
  defaultLocale: string;
  namespaces: string[];
  pathToFiles: string;
  keyFile: string;
  fileType: 'json'; // | 'js' | 'ts';
};

export const EDITOR_CONFIG = {
  locales: ['fr', 'en'],
  defaultLocale: 'en',
  namespaces: ['common', 'errors'],
  keyFile: '/Users/gtaja/Projects/i18n-local-editor/locales/trKeys.ts',
  pathToFiles: '/Users/gtaja/Projects/i18n-local-editor/locales/{{locale}}/{{ns}}.json',
  fileType: 'json',
};
