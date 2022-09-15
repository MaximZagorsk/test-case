interface IArgs {
    name: String;
    description: String;
    property: String;
    skill: String
    id: string;
    nodes: IArgs[];
    type: 'parent'| 'child';
  }

  type ArgsState = {
    args: IArgs[];
  };

  type ArgsAction = {
    type: string;
    args: IArgs;
    prop: string;
    value: string | null | IArgs;
  };

  type DispatchType = (args: ArgsAction) => ArgsAction;