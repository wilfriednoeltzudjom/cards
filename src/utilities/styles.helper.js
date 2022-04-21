function joinClassNames(...classNames) {
  return classNames
    .map((value) => value || '')
    .join(' ')
    .trim();
}

export { joinClassNames };
