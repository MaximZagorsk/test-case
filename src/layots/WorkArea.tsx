import React, { useEffect } from "react";
import { Dispatch, useState } from "react";
import { useDispatch } from "react-redux";
import ItemViewComp from "../component/ItemView";
import TreeViewComp from "../component/Tree";
import { pushChild, updateArgs } from "../store/actionCreators";

import "./workarea.css";

const WorkArea = () => {

  const dispatch: Dispatch<any> = useDispatch();
  // useState элемента
  const [item, setItem] = useState<IArgs>(null);
  
  // обновление дерева
  const [forceUpd, setForceUpd] = useState(false);

  // сохранение элемента
  const saveArgs = React.useCallback(
    (arg: IArgs, prop: string, value: string) =>
      dispatch(updateArgs(arg, prop, value)),
    [dispatch]
  );

  // добавление элемента
  const addChild = React.useCallback(
    (arg: IArgs, prop: string, value: IArgs) =>
      dispatch(pushChild(arg, prop, value)),
    [dispatch]
  );

  // Если кнопка Save была нажата, то forceUpd вернется в состояние "false"
  useEffect(() => {
    if (forceUpd == true) {
      setForceUpd(false);
    }
  }, [forceUpd]);

  return (
    <div className="workarea-cs">
      <TreeViewComp item={item} setItem={setItem} forceUpd={forceUpd} />
      {item && (
        <ItemViewComp
          arg={item}
          saveArgs={saveArgs}
          forceUpdate={setForceUpd}
          addChild={addChild}
        />
      )}
    </div>
  );
};

export default WorkArea;
