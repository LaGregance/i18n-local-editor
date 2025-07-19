export const countOccurrences = (str: string, sub: string) => {
  if (sub === '') {
    return 0;
  }

  let count = 0;
  let pos = 0;

  while ((pos = str.indexOf(sub, pos)) !== -1) {
    count++;
    pos++; // Move by 1 for overlap
  }

  return count;
};

export const setObjectValueAtPath = (obj: any, path: string, value: any) => {
  const keys = path.split('.');

  for (let i = 0; i < keys.length - 1; i++) {
    obj[keys[i]] ??= {};
  }
  obj[keys[keys.length - 1]] = value;
};

export const deleteObjectValueAtPath = (obj: any, path: string) => {
  const keys = path.split('.');

  for (let i = 0; i < keys.length - 1; i++) {
    obj[keys[i]] ??= {};
  }
  delete obj[keys[keys.length - 1]];
};

export const createURLQuery = (params: any) => {
  let query = new URLSearchParams(params).toString();
  if (query.length > 0) {
    query = '?' + query;
  }
  return query;
};

export const manageAPIResponse = async (response: Response) => {
  if (response.status >= 400) {
    const data = await response.json();

    const popup = document.createElement('div');
    popup.innerHTML = `<div class="bg-red-500 text-white p-4 rounded-lg absolute top-10 right-10 z-20"><p>${data?.message ?? 'Unknown error'}</p></div>`;
    document.querySelector('body')?.append(popup);

    setTimeout(() => {
      popup.remove();
    }, 1500);
    return false;
  }
  return true;
};
