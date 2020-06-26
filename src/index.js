import React, { useState, useMemo, useCallback } from "react";

export default (initialState = {}, prop = 'name') => {
  const [values, setValues] = useState(initialState);
  const handleChange = useMemo(() => (event) => {
    if (typeof (event.target[prop]) === 'undefined') {
      throw new Error(`[useFieldValue] prop ${prop}  not present on target`)
    }
    const newState = {
      ...values,
      [event.target[prop]]: event.target.value
    }
    setValues(newState);
    return newState;
  }, []);

  const replaceValues = useCallback((values) => setValues(values), [])

  return {
    values,
    handleChange,
    replaceValues,
    inputProps: prop => ({
      onChange: handleChange,
      value: values[prop]
    })
  };
}
