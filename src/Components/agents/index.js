import * as React from "react";
import { Show, ReferenceManyField, BooleanField, NumberField, List,
    Datagrid,
    Edit,
    Create,
    SimpleForm,
    DateField,
    TextField,
    EditButton,
    TabbedShowLayout,
    Tab,
    TopToolbar,
    TextInput, } from 'react-admin';
import { Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';

const Aside = () => (
    <div style={{ width: 200, margin: "1em" }}>
      <Typography variant="h6">Agent details</Typography>
      <Typography variant="body2">
        Agent will only be published only the consumer
      </Typography>
    </div>
  );


const AgentActions = (basePath, data) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />
        {/* Add your custom actions */}
        <Button color="primary">Custom Action</Button>
    </TopToolbar>
);
  
  export const AgentList = (props) => (
    <List aside={<Aside />} title="List of Agents" {...props}>
      <Datagrid rowClick="show">
        <TextField source="username" />
        <TextField source="email" />
        <TextField source="phone" />
        <TextField source="profile_url" />
        <EditButton />
      </Datagrid>
    </List>
  );
  
  export const CreateAgent = (props) => (
    <Create title="Create a new Agent" {...props}>
      <SimpleForm>
        <div>
          <TextInput source="username" label="Firstname Lastname " />
          <TextInput source="email" label="Email" />
          <TextInput source="phone" label="Moible Number" />
          <TextInput source="profile_url" label="profile link" />
          <TextInput source="password" label="Password" />
        </div>
      </SimpleForm>
    </Create>
  );
  
  export const AgentTitle = (record) => {
    return <span>Post {record ? `"${record.name}"` : ""}</span>;
  };
  
  export const AgentEdit = (props) => (
    <Edit title={<AgentTitle />} {...props}>
      <SimpleForm>
        <div>
          <TextInput disabled source="id" />
          <TextInput source="username" label="Firstname Lastname" />
          <TextInput source="email" label="Email Address" />
          <TextInput source="phone" label="Mobile Number" />
          <TextInput source="profile_url" label="profile link" />
          <TextInput source="password" label="Password" />
        </div>
      </SimpleForm>
    </Edit>
  );