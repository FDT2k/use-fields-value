
import React,{ useState,useEffect } from "react";
/*
validateFN :: String -> String -> Object -> Boolean
validateFN :: FieldProp -> FieldValue -> CurrentFormValues -> Boolean

*/
export default (initialState,validateFn) => {
  const [debug,setDebug] = useState(false)

  const [validationStatus, setValidationStatus] = useState({});
  const [formValid, setFormValid] = useState(true)

  const handleValidation = (fieldValues,forceTouched=false) => {
    debug && console.log('[VALIDATOR] - Begin',fieldValues,forceTouched)
    debug && !validateFn&& console.error('[VALIDATOR] no validation function set')
    let newValidationStatus ={}
    let formIsValid = true;
    Object.keys(fieldValues).map( field => {
      const value         = fieldValues[field]; // current value
      const initialValue  = initialState[field]; // initial Value

      // has the field been touched ? initially false .
      let touched = typeof (validationStatus[field]) ==='undefined' ? false: validationStatus[field].touched;

      // is field valid. ?
      const validationResult =  validateFn ? validateFn(field,value,fieldValues) : true;

      // if validation function returns empty string or true, this is a success
      const validationSuccess = validationResult === '' || validationResult ===true ? true: false;
      const error = typeof(validationResult) === 'string' ? validationResult : '';

      let valid = validationSuccess

      if( !touched && fieldValues[field] !== initialState[field]){
        touched = true
      }

      if(forceTouched){
        touched=true
      }

      newValidationStatus[field] = {valid,touched,error}
      formIsValid = formIsValid && valid
    })
    setFormValid(formIsValid)
    setValidationStatus(newValidationStatus)

    debug && console.log('[VALIDATOR] - Done',newValidationStatus,forceTouched)

    return newValidationStatus;
  }


  const setTouched = (key,value) => {
    let newState = {...validationStatus} ;
    newState[key].touched = value;
    setValidationStatus(newState)
    return newState;
  }

  const handleSubmit = (event)=> {
      /*setFormTouched(true)
      console.log(formIsValid,fields,validationStatus)
      if(formIsValid){
        submitFn(fields,validationStatus);
      }else{
        setValidation(handleValidation(fields,true))
      }
      event.preventDefault();*/
  }



  return {
    formValid,validationStatus,handleValidation,setTouched,setDebug
  };
}
