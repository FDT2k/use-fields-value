import { useState, useEffect } from 'react';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/*
validateFN :: String -> String -> Object -> Boolean
validateFN :: FieldProp -> FieldValue -> CurrentFormValues -> Boolean

*/

var useFieldValidator = (function (initialState, validateFn) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      debug = _useState2[0],
      setDebug = _useState2[1];

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      validationStatus = _useState4[0],
      setValidationStatus = _useState4[1];

  var _useState5 = useState(true),
      _useState6 = _slicedToArray(_useState5, 2),
      formValid = _useState6[0],
      setFormValid = _useState6[1];

  var handleValidation = function handleValidation(fieldValues) {
    var forceTouched = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    debug && console.log('[VALIDATOR] - Begin', fieldValues, forceTouched);
    debug && !validateFn && console.error('[VALIDATOR] no validation function set');
    var newValidationStatus = {};
    var formIsValid = true;
    Object.keys(fieldValues).map(function (field) {
      var value = fieldValues[field]; // current value

      var initialValue = initialState[field]; // initial Value
      // has the field been touched ? initially false .

      var touched = typeof validationStatus[field] === 'undefined' ? false : validationStatus[field].touched; // is field valid. ?

      var validationResult = validateFn ? validateFn(field, value, fieldValues) : true; // if validation function returns empty string or true, this is a success

      var validationSuccess = validationResult === '' || validationResult === true ? true : false;
      var error = typeof validationResult === 'string' ? validationResult : '';
      var valid = validationSuccess;

      if (!touched && fieldValues[field] !== initialState[field]) {
        touched = true;
      }

      if (forceTouched) {
        touched = true;
      }

      newValidationStatus[field] = {
        valid: valid,
        touched: touched,
        error: error
      };
      formIsValid = formIsValid && valid;
    });
    setFormValid(formIsValid);
    setValidationStatus(newValidationStatus);
    debug && console.log('[VALIDATOR] - Done', newValidationStatus, forceTouched);
    return newValidationStatus;
  };

  var setTouched = function setTouched(key, value) {
    var newState = _objectSpread2({}, validationStatus);

    newState[key].touched = value;
    setValidationStatus(newState);
    return newState;
  };

  return {
    formValid: formValid,
    validationStatus: validationStatus,
    handleValidation: handleValidation,
    setTouched: setTouched,
    setDebug: setDebug
  };
});

var useFieldValues = (function () {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var attribute = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'name';

  var _useState = useState(initialState),
      _useState2 = _slicedToArray(_useState, 2),
      values = _useState2[0],
      setValues = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      touched = _useState4[0],
      setTouched = _useState4[1];

  var handleChange = function handleChange(event) {
    setTouched(true);

    if (!event || !event.target) {
      return;
    }

    if (typeof event.target[attribute] === 'undefined') {
      throw new Error("[useFieldValue] attribute \"".concat(attribute, "\"  not present on target node"));
    }

    var newState = _objectSpread2(_objectSpread2({}, values), {}, _defineProperty({}, event.target[attribute], event.target.value));

    setValues(newState);
    return newState;
  };

  var replaceValues = function replaceValues(values) {
    return setValues(values);
  };

  var assignValues = function assignValues(vals) {
    var v = Object.assign({}, values, vals);
    setValues(v);
  };

  return {
    values: values,
    touched: touched,
    handleChange: handleChange,
    replaceValues: replaceValues,
    assignValues: assignValues,
    inputProps: function inputProps(prop) {
      return _defineProperty({
        onChange: handleChange,
        value: values[prop]
      }, attribute, prop);
    }
  };
});

var useForm = (function (initialState, submitFn, validateFn) {
  var prop = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'name';
  var dbg = arguments.length > 4 ? arguments[4] : undefined;

  var _useState = useState(dbg || false),
      _useState2 = _slicedToArray(_useState, 2),
      debug = _useState2[0],
      setDebug = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      formTouched = _useState4[0],
      setFormTouched = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      shouldSubmit = _useState6[0],
      setShouldSubmit = _useState6[1];

  var _useFieldValues = useFieldValues(initialState, prop),
      fields = _useFieldValues.values,
      handleFieldChange = _useFieldValues.handleChange,
      inputProps = _useFieldValues.inputProps,
      assignValues = _useFieldValues.assignValues;

  var _useFieldValidator = useFieldValidator(initialState, validateFn),
      formValid = _useFieldValidator.formValid,
      validationStatus = _useFieldValidator.validationStatus,
      handleValidation = _useFieldValidator.handleValidation,
      setTouched = _useFieldValidator.setTouched,
      setValidatorDebug = _useFieldValidator.setDebug;

  var handleSubmit = function handleSubmit(event) {
    setFormTouched(true);
    debug && console.log('[SUBMIT_ATTEMPT]', formValid, fields, validationStatus);
    handleValidation(fields, true);
    setShouldSubmit(true);
    /* if(formValid){
       debug && console.log('[FORM IS VALID -> SUBMITTING]',fields)
        submitFn(fields,validationStatus);
     }else{
       handleValidation(fields,true);
     }*/
    //    handleValidation(fields,true);

    event.preventDefault();
  };

  var handleEvent = function handleEvent(event) {
    var fieldKey = event.target[prop];
    debug && console.log('[FORM_EVENT]', event.type, event.target[prop]);

    if (event.type === 'input') {
      var newState = handleFieldChange(event); //    handleValidation(newState)
    }

    if (event.type === 'blur') {
      setTouched(fieldKey, true);
      handleValidation(fields);
    }

    if (event.type === 'focus') ;
  };

  useEffect(function () {
    if (shouldSubmit && formValid) {
      debug && console.log('[FORM IS VALID -> SUBMITTING]', fields);
      submitFn(fields, validationStatus);
    }

    if (shouldSubmit) {
      setShouldSubmit(false);
    }
  }, [shouldSubmit, formValid]);
  useEffect(function () {
    setValidatorDebug(debug);
    handleValidation(fields);
  }, []);
  return {
    fields: fields,
    assignValues: assignValues,
    inputProps: inputProps,
    setDebug: setDebug,
    validator: validationStatus,
    handleSubmit: handleSubmit,
    formProps: {
      onSubmit: handleSubmit
    },
    handleInput: handleEvent,
    handleEvents: {
      onChange: handleEvent,
      onBlur: handleEvent,
      onFocus: handleEvent
    }
  };
});

export { useFieldValidator, useFieldValues, useForm };
//# sourceMappingURL=index.es.js.map
