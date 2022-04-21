import { useState, useEffect } from 'react';

export default function ({ shown, onHide }) {
  const [hasBeenShownOnce, setHasBeenShownOnce] = useState(false);
  useEffect(() => {
    if (shown && !hasBeenShownOnce) setHasBeenShownOnce(true);
  }, [shown, hasBeenShownOnce]);

  function handleHide() {
    if (onHide) onHide();
  }

  return { hasBeenShownOnce, handleHide };
}
