const urlValidation = (url: string): string => {
  if (!url.startsWith('http://') || !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

export { urlValidation };
