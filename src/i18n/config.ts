export type EditorConfig = {
  locales: string[];
  defaultLocale: string;
  namespaces: string[];
  pathToFiles: string;
  fileType: 'json' | 'js' | 'ts';
};

export const EDITOR_CONFIG = {
  locales: ['fr', 'en'],
  defaultLocale: 'en',
  namespaces: ['common', 'errors'],
  pathToFiles: '/Users/gtaja/Projects/i18n-local-editor/locales/{{locale}}/{{ns}}.json',
  fileType: 'json',
};
