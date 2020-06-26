import React from 'react'
import useFieldsValue  from '@geekagency/use-fields-value'

const App = () => {
  const {values, inputProps,handleChange} = useFieldsValue({field:'hello world'})
  return (
    <div>
      <div>
        {values.field}<br/>
        <input type="text" name="field" onChange={handleChange} value={values.field}/>
      </div>

      <div>
        {values.field}<br/>
        <input type="text" name="field" {...inputProps('field')}/>
      </div>
    </div>
  )
}
export default App