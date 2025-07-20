export const pushIgnoreDuplicates = (array: string[], value: string) => {
  if (!array.includes(value)) {
    array.push(value);
  }
};

export const removeSuffix = (str: string, suffixes: string[]) => {
  for (const suffix of suffixes) {
    if (str.endsWith(suffix)) {
      return str.slice(0, -suffix.length);
    }
  }
  return str;
};

export const removeUndefined = (obj: any) => {
  for (const key of Object.keys(obj)) {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
};
