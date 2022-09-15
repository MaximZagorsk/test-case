import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Input, TextField } from "@mui/material";
import { Console } from "console";
import { Controller, useForm } from "react-hook-form";

import "./itemview.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// Компонента свойств элемента и действий с ним
const ItemViewComp = (props) => {
  const {
    arg, // элемент
    saveArgs, // redux save элемент
    forceUpdate, // useState для обновления дерева
    addChild,
  } = props;

  const [value, setValuee] = React.useState(0); // для tabов

  const [childItem, setChildItem] = React.useState<IArgs>(null); // для загрузки элемента в дерево

  // Смена tab`а
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValuee(newValue);
  };

  // Скачивание файла
  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });

    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  // handler для скачивания файла
  const exportToJson = (e) => {
    e.preventDefault();
    downloadFile({
      data: JSON.stringify(arg),
      fileName: `${arg.name}_${arg.id}.json`,
      fileType: "text/json",
    });
  };

  // useForm для изменения значений элемента
  const {
    control,
    trigger,
    setValue,
    getValues,
    handleSubmit, // обертка над handle'ром submit'а данных формы
    formState: { errors, isValid },
  } = useForm({
    // use form продебажить
    // use form resolver глянуть
    // fieldState посмотреть
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: arg.name,
      description: arg.description,
      property: arg.property,
      skill: arg.skill,
    },
  });

  // useEffect для обновления значений в component`e
  React.useEffect(() => {
    setValue("name", arg.name);
    setValue("description", arg.description);
    setValue("property", arg.property);
    setValue("skill", arg.skill);
  }, [arg]);

  // Функция для создания однотипных textfield для разных элементов
  const TextFieldFunc = (prop) => {
    const { name, propVal } = prop;
    return (
      <Controller
        control={control}
        name={propVal}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            size="small"
            sx={{ marginTop: "10px" }}
            className="textfiel-csE"
            label={name}
            value={getValues(propVal)}
            onChange={(event) => {
              setValue(propVal, event.target.value);
              onChange(getValues(propVal));

              onBlur();
            }}
          />
        )}
      />
    );
  };

  // Обработчик загрузки файла
  const handleOnChangeInput = (e) => {
    const files = (e.target as HTMLInputElement).files || [];
    const reader = new FileReader();
    reader.readAsText(files[0]);
    let result = null;
    reader.onload = (e) => {
      const text = e.target.result;
      result = text;
      result = JSON.parse(result);
      let res: IArgs = result;
      setChildItem(res);
    };
  };

  const handleButtonSave = () => {
    saveArgs(arg, "name", getValues("name"));
    saveArgs(arg, "description", getValues("description"));
    saveArgs(arg, "property", getValues("property"));
    saveArgs(arg, "skill", getValues("skill"));
    if (childItem) {
      addChild(arg, "nodes", childItem);
      setChildItem(null);
    }
    //   handleOnChange(null);
    forceUpdate(true);
  }

  return (
    <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <div className="box-cs">
          <TextFieldFunc name={"Name"} propVal={"name"} />
          <TextFieldFunc name={"Description"} propVal={"description"} />
          <span className="box-cs button-cs">
            Загрузить элемент
            <input
              className="button-cs"
              id="inputload"
              type="file"
              accept=".json"
              onChange={handleOnChangeInput}
            />
          </span>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <div className="box-cs">
          <TextFieldFunc name={"Property"} propVal={"property"} />
          <TextFieldFunc name={"Skill"} propVal={"skill"} />
        </div>
      </TabPanel>

      <Button className="button-cs" variant="contained" onClick={exportToJson}>
        Download JSON file
      </Button>

      <Button
        sx={{ marginTop: "10px" }}
        className="button-cs"
        variant="contained"
        onClick={handleButtonSave}
      >
        Save
      </Button>
    </Box>
  );
};

export default ItemViewComp;
