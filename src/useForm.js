import React,{ useState,useEffect } from "react";

import useFieldValues from './useFieldValues'
import useFieldValidator from './useFieldValidator'

export default (initialState,submitFn,validateFn,prop='name',dbg) => {

  const [debug,setDebug] = useState(dbg || false)
  const [formTouched,setFormTouched] = useState(false)

  const [shouldSubmit,setShouldSubmit] = useState(false);
  const {values: fields, handleChange : handleFieldChange,inputProps} = useFieldValues(initialState,prop);

  const {formValid,validationStatus,handleValidation,setTouched,setDebug:setValidatorDebug} = useFieldValidator(initialState,validateFn)


  const handleSubmit = (event)=> {
      setFormTouched(true)
      debug && console.log('[SUBMIT_ATTEMPT]',formValid,fields,validationStatus)
      handleValidation(fields,true);
      
      setShouldSubmit(true)
     /* if(formValid){
        debug && console.log('[FORM IS VALID -> SUBMITTING]',fields)

        submitFn(fields,validationStatus);
      }else{
        handleValidation(fields,true);
      }*/
  //    handleValidation(fields,true);
      event.preventDefault();
  }

  const handleEvent = (event) => {
    const fieldKey = event.target[prop]
    debug && console.log('[FORM_EVENT]',event.type, event.target[prop])
    if( event.type === 'input'){
      let newState = handleFieldChange(event);
  //    handleValidation(newState)
    }

    if(event.type ==='blur'){
      setTouched(fieldKey,true)

      handleValidation(fields)
    }
    if(event.type === 'focus'){

      
    }
  }

  useEffect(()=>{
    if(shouldSubmit && formValid){
      debug && console.log('[FORM IS VALID -> SUBMITTING]',fields)
      submitFn(fields,validationStatus);
    }
    if(shouldSubmit){
      setShouldSubmit(false)
    }
  },[shouldSubmit,formValid])

  useEffect(()=>{
    setValidatorDebug(debug)

    handleValidation(fields)
  },[])

  return {
    fields,
    inputProps,
    setDebug,
    validator:validationStatus,
    handleSubmit,
    formProps:{
      onSubmit:handleSubmit
    },
    handleInput:handleEvent,
    handleEvents: {onChange:handleEvent,onBlur:handleEvent,onFocus:handleEvent}
  };
}
