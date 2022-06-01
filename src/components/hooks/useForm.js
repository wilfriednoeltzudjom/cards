import { useState, useCallback } from 'react';
import { dataHelper } from '../../tools';

export default function ({ onSubmit, initialState = {} } = {}) {
  const [formState, setFormState] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = useCallback(({ name, value, type, valueAsNumber }) => {
    setFormState((currentFormState) => ({
      ...currentFormState,
      [name]: type === 'number' ? valueAsNumber : value,
    }));
    setFormErrors((currentFormErrors) => {
      if (currentFormErrors[name]) {
        const clone = dataHelper.cloneDeep(currentFormErrors);
        delete clone[name];

        return clone;
      }

      return currentFormErrors;
    });
  });

  const handleSubmit = useCallback((evt) => {
    if (evt) evt.preventDefault();
    onSubmit(evt);
  }, []);

  const updateFormState = useCallback((formStateUpdates = {}) => {
    setFormState((currentFormState) => ({ ...currentFormState, ...formStateUpdates }));
  }, []);

  const resetFormState = useCallback((formStateUpdates = {}) => {
    setFormState(formStateUpdates);
    setFormErrors({});
  }, []);

  return {
    formState,
    formErrors,
    setFormErrors,
    handleChange,
    handleSubmit,
    updateFormState,
    resetFormState,
  };
}
