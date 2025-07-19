import path from 'path';

export const getPWD = () => {
  if (process.env.I18N_DEVELOPMENT) {
    return process.cwd();
  } else {
    return path.join(process.cwd(), '../..');
  }
};
