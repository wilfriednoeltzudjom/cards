import { useState, useCallback } from 'react';

export default function () {
  const [shown, setShown] = useState(false);

  const handleShow = useCallback(() => {
    setShown(() => true);
  }, []);

  const handleHide = useCallback(() => {
    setShown(() => false);
  }, []);

  return {
    shown,
    handleShow,
    handleHide,
  };
}
