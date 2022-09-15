import * as actionTypes from "./actionTypes";

const initialState: ArgsState = {
  args: [
    {
      name: "Name1",
      id: "1",
      description: "description1",
      property: "property1",
      skill: "skill1",
      nodes: [
        {
          name: "Name2",
          id: "2",
          description: "description2",
          property: "property2",
          skill: "skill2",
          nodes: [],
          type: "child",
        },
        {
          name: "Name3",
          id: "3",
          description: "description3",
          property: "property3",
          skill: "skill3",
          nodes: [
            {
              name: "Name4",
              id: "4",
              description: "description4",
              property: "property4",
              skill: "skill4",
              nodes: [],
              type: "child",
            },
          ],
          type: "parent",
        },
      ],
      type: "parent",
    },
  ],
};

const reducer = (
  state: ArgsState = initialState,
  action: ArgsAction
): ArgsState => {
  switch (action.type) {
    case actionTypes.UPDATE_ARGS:
      console.log("reducer", action);
      action.args[action.prop] = action.value;
      return {
        ...state,
        args: state.args,
      };
    case actionTypes.ADD_CHILD:
      console.log("reducer", action.args);

      action.args[action.prop].push(action.value);
      action.args["type"] = "parent";
      return {
        ...state,
        args: state.args,
      };
  }
  return state;
};

export default reducer;
