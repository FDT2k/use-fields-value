import React, { useState, useMemo, useCallback } from "react";

export default (initialState = {}, attribute = 'name') => {
  const [values, setValues] = useState(initialState);
  const [touched,setTouched] = useState(false);
  const handleChange =(event) => {
    setTouched(true);
    if (typeof (event.target[attribute]) === 'undefined') {
      throw new Error(`[useFieldValue] attribute "${attribute}"  not present on target node`)
    }
    const newState = {
      ...values,
      [event.target[attribute]]: event.target.value
    }
    setValues(newState);
    return newState;
  }

  const replaceValues =(values) => setValues(values)

  return {
    values,
    touched,
    handleChange,
    replaceValues,
    inputProps: prop => ({
      onChange: handleChange,
      value: values[prop],
      [attribute]:prop
    })
  };
}
