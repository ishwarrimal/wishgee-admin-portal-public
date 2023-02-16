import React, { useEffect } from "react";
import { ResultEdit, ResultCreate } from "../results";
import {
  TabbedShowLayout,
  Tab,
  Edit,
  DateField,
  TextField,
  Show,
  SelectInput,
  SimpleForm,
  Toolbar,
  SaveButton,
  List, 
  Datagrid, 
  ShowButton
} from "react-admin";
import { Typography } from "@material-ui/core";

import { WishStatusConstant } from "../../Constants/index.js";

const WishStatusType = (props) => {
  // const { show } = props;
  // const dataProvider = useDataProvider();
  // const [types, setTypes] = React.useState([]);
  // useEffect(() => {
  //   dataProvider
  //     .getList(`api/crm/product/types`, {
  //       pagination: { page: 1, perPage: 100 },
  //     })
  //     .then((resp) => {
  //       setTypes([...resp.data]);
  //       console.log(resp.data);
  //     })
  //     .catch((e) => console.log("Error:..", e));
  // }, [dataProvider]);

  const PostCreateToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton
        label="Save"
        redirect="show"
        transform={(data) => ({ ...data, updateStatusType: true })}
        submitOnEnter={true}
      />
    </Toolbar>
  );

  return (
    <Edit {...props} undoable={false}>
      {/* {show === "type" ? (
        <SimpleForm toolbar={<PostCreateToolbar />}>
          <TextField label="Current Type" source="type[name]" />
          <SelectInput
            label="Type"
            source="type[name]"
            choices={types.map((type) => {
              return { id: type.name, name: type.name };
            })}
            // [
            //   { id: "PROCESSING", name: "PROCESSING" },
            //   { id: "PROCESSED", name: "PROCESSED" },
            // ]}
          />
        </SimpleForm>
      ) : ( */}
        <SimpleForm toolbar={<PostCreateToolbar />}>
          <TextField label="Current Status" source='status' />
          <SelectInput
            label="Status"
            source="status"
            choices={[
              { id: "reviewed", name: "REVIEWED" },
              { id: "waiting_for_approval", name: "WAITING FOR APPROVAL" },
              { id: "resolved", name: "RESOLVED" },
            ]}
          />
        </SimpleForm>
      {/* )} */}
    </Edit>
  );
};

const ResultLocalComponent = (props) => {
  return props?.record?.result ? (
    <ResultEdit {...props} />
  ) : (
    <ResultCreate {...props} />
  );
};


const Aside = () => (
    <div style={{ width: 200, margin: "1em" }}>
      <Typography variant="h6">Open details</Typography>
      <Typography variant="body2">
        Wishes which are not yet resolved.
      </Typography>
      <ul>
        <li>Review the wish in New Wishe.</li>
        <li>Add result and changes status to waiting for approval in second step.</li>
        <li>Review the result and mark as resolved in final step.</li>
        </ul>
    </div>
  );
  
export const OpenWishList = (props) => (
    <List aside={<Aside />} title="List of wishes" {...props}>
      <Datagrid rowClick="show">
        <TextField source="title" />
        <DateField source="created" label="Created date"/>
        <DateField source="updated" label="Last updated on"/>
        <TextField source="max_budget" label="Budget"/>
        <TextField source="description" />
        <TextField source="agent.username" label="Agent"/>
        <TextField source="customer.username" label="Customer" />
        <TextField source="status"/>
        <ShowButton />
      </Datagrid>
    </List>
  );

  export const Details = (props) => {
    return (
      <Show {...props} title="Wish Details">
        <TabbedShowLayout>
          <Tab label="summary">
            <TextField label="Id" source="id" />
            <TextField source="title" />
            <TextField source="min_budget" />
            <TextField source="max_budget" />
            <TextField source="brands_included" />
            <TextField source="description" />
            <TextField source="keywords" />
            <TextField record="WishStatusConstant" source="status" />
          </Tab>
          {/* <Tab label="Type">
            <WishStatusType {...props} show="type" />
          </Tab> */}
          <Tab label="Status">
            <WishStatusType {...props} show="status" />
          </Tab>
          <Tab label="Result" path="result">
            <ResultLocalComponent {...props} />
          </Tab>
        </TabbedShowLayout>
      </Show>
    );
  };
