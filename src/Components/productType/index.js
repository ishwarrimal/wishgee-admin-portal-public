import React from "react";
import {
  List,
  TextField,
  Datagrid,
  Edit,
  Create,
  TextInput,
  EditButton,
  SimpleForm,
} from "react-admin";

export const ProductTypeList = (props) => (
  <List {...props} title="Available Categories" perPage="100">
    <Datagrid>
      <TextField source="type" label="Product Type"/>
      <TextField source="keywords" label="Keywords" />
      <EditButton />
    </Datagrid>
  </List>
);

export const ProductTypeCreate = (props) => (
  <Create {...props}>
    <SimpleForm submitOnEnter={false}>
      <TextInput source="type" label="Product Type"/>
      <TextInput source="keywords" label="Keywords" />
    </SimpleForm>
  </Create>
);

export const ProductTypeEdit = (props) => (
  <Edit {...props}>
    <SimpleForm submitOnEnter={false}>
    <TextInput source="type" label="Product Type"/>
      <TextInput source="keywords" label="Keywords" />
    </SimpleForm>
  </Edit>
);