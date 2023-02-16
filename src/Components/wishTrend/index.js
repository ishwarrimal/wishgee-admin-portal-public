// import { DateRange } from "@material-ui/icons";
import { Typography } from "@material-ui/core";
import React from "react";
import {
  Create,
  TextInput,
  TextField,
  SimpleForm,
  EditButton,
  Edit,
  List,
  Datagrid,
  Filter,
  AutocompleteInput
} from "react-admin";
import { ProductType } from "../../Constants";


const Aside = () => (
  <div style={{ width: 200, margin: "1em" }}>
    <Typography variant="h6">Recent results</Typography>
    <Typography variant="body2">
      Trending wish details
    </Typography>
  </div>
);

const SearchFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
)

export const WishTrendList = (props) => (
  <List aside={<Aside />} title="Wish Trend" filters={<SearchFilter />} {...props}>
      <Datagrid>
          <TextField source="title" label="Title" />
          <TextField source="subtitle" label="Subtitle" />
          <TextField source="description" label="Description"/>
          <TextField source="type" label="type" />
          <TextField source="link" label="Link" />
          <EditButton />
      </Datagrid>
  </List>
);

export const WishTrendCreate = (props) => (
    <Create {...props}>
      <SimpleForm submitOnEnter={false}>
        <TextInput source="title" label="Title" />
        <TextInput source="subtitle" label="Subtitle" />
        <TextInput source="description" label="Description"/>
        <TextInput source="link" label="Link"/>
        <AutocompleteInput source="type" label="Product Type" choices={ProductType} />
      </SimpleForm>
    </Create>
  );

 export const WishTrendEdit = (props) => (
    <Edit {...props} undoable={false}>
      <SimpleForm submitOnEnter={false}>
        <TextInput source="title" label="Title" />
        <TextInput source="subtitle" label="Subtitle" />
        <TextInput source="description" label="Description"/>
        <TextInput source="link" label="Link"/>
        <AutocompleteInput source="type" label="Product Type" choices={ProductType} />
      </SimpleForm>
    </Edit>
  );

  // export { WishTrendEdit, WishTrendList, WishTrendCreate }

  