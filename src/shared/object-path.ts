export const getObjectValueAtPath = (obj: any, path: string): any => {
  const keys = path.split('.');

  for (const key of keys) {
    if (!obj) {
      return undefined;
    }
    obj = obj[key];
  }

  return obj;
};

export const setObjectValueAtPath = (obj: any, path: string, value: any) => {
  const keys = path.split('.');

  for (let i = 0; i < keys.length - 1; i++) {
    obj[keys[i]] ??= {};
    if (typeof obj[keys[i]] !== 'object') {
      throw new Error(`Conflict with existing key ${keys.slice(0, i + 1).join('.')}`);
    }
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
