import {useFieldValues}  from './'
import { renderHook, act } from "@testing-library/react-hooks";

describe('useFieldValues', () => {

  it('render',  ()=>{
    const { result } = renderHook(() => useFieldValues());

    expect (result.current.values).toEqual({})

    act(() => {
      result.current.replaceValues({name:'value'})
    });

    expect (result.current.values).toEqual({name:'value'})

    act(() => {
      const state = result.current.handleChange({target:{name:'name',value:'newvalue'}})
    });

    expect (result.current.values).toEqual({name:'newvalue'})

    act(() => {

        const test = ()=>result.current.handleChange({target:{value:'newvalue'}});

        expect(test).toThrow(Error);
    });


    expect(result.current.inputProps('name').value).toBe('newvalue')

    act(() => {
      const state = result.current.inputProps('name').onChange({target:{name:'name',value:'yey'}})
    });

    expect(result.current.inputProps('name').value).toBe('yey')

  })


})
