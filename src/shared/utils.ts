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
    showSnackbar(data?.message ?? 'Unknown error', 'error');
    return false;
  }
  return true;
};

export const showSnackbar = (text: string, type: 'error' | 'info', duration = 5000) => {
  const popup = document.createElement('div');
  const color = type === 'error' ? 'bg-red-500' : 'bg-green-500';
  popup.innerHTML = `<div class="${color} text-white p-4 rounded-lg absolute top-10 right-10 z-20"><p>${text}</p></div>`;
  document.querySelector('body')?.append(popup);

  setTimeout(() => {
    popup.remove();
  }, duration);
};

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
