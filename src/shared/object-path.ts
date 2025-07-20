export const getObjectValueAtPath = (obj: any, path: string): any => {
  const keys = path.split('.');

  for (const key of keys) {
    obj = obj[key];
  }

  return obj;
};

export const setObjectValueAtPath = (obj: any, path: string, value: any) => {
  const keys = path.split('.');

  for (let i = 0; i < keys.length - 1; i++) {
    obj[keys[i]] ??= {};
    obj = obj[keys[i]];
  }
  obj[keys[keys.length - 1]] = value;
};

export const deleteObjectValueAtPath = (obj: any, path: string) => {
  const keys = path.split('.');

  for (let i = 0; i < keys.length - 1; i++) {
    obj[keys[i]] ??= {};
    obj = obj[keys[i]];
  }
  delete obj[keys[keys.length - 1]];
};
