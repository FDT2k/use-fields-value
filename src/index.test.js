import  useMyHook  from './'
import { renderHook, act } from "@testing-library/react-hooks";

describe('useMyHook', () => {
 /* it('updates every second', () => {
    const { result } = renderHook(() => useMyHook());

    expect(result.current).toBe(0);

    // Fast-forward 1sec
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Check after total 1 sec
    expect(result.current).toBe(1);

    // Fast-forward 1 more sec
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // Check after total 2 sec
    expect(result.current).toBe(2);
  })*/

  it('render',  ()=>{
    const { result } = renderHook(() => useMyHook());

    expect (result.current.values).toEqual({})

    act(() => {
      result.current.replaceValues({name:'value'})
    });

    expect (result.current.values).toEqual({name:'value'})

    act(() => {
      const state = result.current.handleChange({target:{name:'name',value:'newvalue'}})
    });
    expect (result.current.values).toEqual({name:'newvalue'})

    expect(()=>result.current.handleChange({target:{value:'newvalue'}})).toThrow(Error)


    expect(result.current.inputProps('name').value).toBe('newvalue')

    act(() => {
      const state = result.current.inputProps('name').onChange({target:{name:'name',value:'yey'}})
    });

    expect(result.current.inputProps('name').value).toBe('yey')

  })


})
