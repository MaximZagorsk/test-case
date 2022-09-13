import * as actionTypes from "./actionTypes";


// Обновление элемента
export function updateArgs(args: IArgs,prop: string,value: string) {
    const action: ArgsAction = {
      type: actionTypes.UPDATE_ARGS,
      args,
      prop,
      value
    }
    return funcAction(action);
  }

  //Добавление элемента в узeл
  export function pushChild(args: IArgs,prop: string,value: IArgs) {
    const action: ArgsAction = {
      type: actionTypes.ADD_CHILD,
      args,
      prop,
      value
    }
    return funcAction(action);
  }
  export function funcAction(action: ArgsAction) {
    return (dispatch: DispatchType) => {
        dispatch(action);
    };
  }