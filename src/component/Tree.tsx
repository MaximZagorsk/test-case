import * as React from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { TreeView } from "@mui/lab";
import {
  UncontrolledTreeEnvironment,
  StaticTreeDataProvider,
  Tree,
} from "react-complex-tree";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { updateArgs } from "../store/actionCreators";
import { useState } from "react";
import { useRef } from "react";
import ItemViewComp from "./ItemView";
import { useReducer } from "react";

// Получение элемента из объекта
function getArgElement(args, id) {
  let result = null;
  for (let index = 0; index < args.length; index++) {
    const element = args[index];
    if (element.type == "parent" && !result) {
      // Рекурсия
      result = getArgElement(element.nodes, id);
    }
    // Получение из верхнего слоя
    if (element.id == id && !result) {
      result = element;
      break;
    }
  }

  return result;
}

// создание tree items из объекта
const GenerateTreeItems = (par) => {
  let params = par;
  let result = [];
  let i = 0;

  params.params.forEach((element) => {
    if (element.type == "parent") {
      result.push(
        <TreeItem
          key={`${i}-${element.id}`}
          nodeId={element.id}
          label={element.name}
        >
            {/* Рекурсия дерева */}
          <GenerateTreeItems params={element.nodes} />
        </TreeItem>
      );
    }
    if (element.type == "child") {
      result.push(
        <TreeItem
          key={`${i}-${element.id}`}
          nodeId={element.id}
          label={element.name}
        />
      );
    }
  });
  return React.createElement("div", { className: "contexCon" }, result);
};

// Компонент дерева
const TreeViewComp = (prop) => {
    // Redux селектор
  const arges: readonly IArgs[] = useSelector(
    (state: ArgsState) => state.args,
    shallowEqual
  );
  const { item, setItem, forceUpd } = prop;




  return (
    <>
      <TreeView
        aria-label="Tree"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        // sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
        onNodeSelect={(
          event: React.SyntheticEvent,
          nodeIds: Array<string> | string
        ) => {
            // Устанавливаем в useState наш выбранный элемент
          setItem(getArgElement(arges, nodeIds));
        }}
      >
          {/* Создание дерева */}
        <GenerateTreeItems params={arges} />
        {/* {generateTreeItem(item)} */}
      </TreeView>
    </>
  );
};

export default TreeViewComp;
