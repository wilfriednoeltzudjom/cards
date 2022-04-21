async function waitFor(millis) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, [millis]);
  });
}

export { waitFor };
