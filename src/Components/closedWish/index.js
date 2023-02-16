import React from "react";
import { List, Datagrid, TextField, ShowButton , Filter, TextInput} from "react-admin";
import { Typography } from "@material-ui/core";
// import BookIcon from '@material-ui/core/svg-icons/action/book';
// export const PostIcon = BookIcon;

const Aside = () => (
  <div style={{ width: 200, margin: "1em" }}>
    <Typography variant="h6">Open details</Typography>
    <Typography variant="body2">
      List of all the closed wishes.
    </Typography>
  </div>
);

const SearchFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
)

export const ClosedWishList = (props) => (
  <List aside={<Aside />} title="List of wishes" filters={<SearchFilter />} {...props}>
    <Datagrid rowClick="show">
      <TextField source="title" />
      <TextField source="maxBudget" />
      <TextField source="description" />
      <TextField source="response[0].productName" label="Result Title" />
      <TextField source="response[0].productLink" label="Link" />
      <TextField source="agent.name" label="Agent"/>
      <TextField source="customer.name" label="Customer" />
      <ShowButton />
    </Datagrid>
  </List>
);