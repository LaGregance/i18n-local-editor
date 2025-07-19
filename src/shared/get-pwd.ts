import path from 'path';

export const getPWD = () => {
  if (process.env.I18N_DEVELOPMENT) {
    return process.cwd();
  } else {
    // CWD will be root-project/node_modules/i18n-local-editor/.next/standalone
    // When running from another project
    return path.join(process.cwd(), '../../../..');
  }
};
