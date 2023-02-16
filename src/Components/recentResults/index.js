import React from "react";
import { List, Datagrid, TextField, SimpleForm , Filter, TextInput, Create, Edit, NumberInput,EditButton, AutocompleteInput} from "react-admin";
import { Typography } from "@material-ui/core";
import { ProductType } from "../../Constants";
// import BookIcon from '@material-ui/core/svg-icons/action/book';
// export const PostIcon = BookIcon;

const Aside = () => (
  <div style={{ width: 200, margin: "1em" }}>
    <Typography variant="h6">Recent results</Typography>
    <Typography variant="body2">
      Create new results here
    </Typography>
  </div>
);

const SearchFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
)

export const RecentResultsList = (props) => (
  <List aside={<Aside />} title="Recent Results" filters={<SearchFilter />} {...props}>
    <Datagrid>
      <TextField source="product_name" label="Result Title" />
      <TextField source="product_price" />
      <TextField source="product_brand" />
      <TextField source="product_type" />
      <TextField source="closing_remark" />
      <TextField source="keywords" />
      <TextField source="product_link" label="Link" />
      <EditButton />
    </Datagrid>
  </List>
);

export const RecentResultCreate = (props) => (
    <Create {...props}>
      <SimpleForm submitOnEnter={false}>
      <AutocompleteInput source="product_type" label="Product Type" choices={ProductType} />
      <TextInput
          label="retult title"
          source="product_name"
        />
        <TextInput
          label="result brand"
          source="product_brand"
        />
        <NumberInput label="price" source="product_price" />
        {/* <TextInput label="brand" source="product_brand" validatestring /> */}
        <TextInput
          label="product link"
          source="product_link"
        />
        <TextInput
          label="image Link"
          source="product_thumbnail"
        />
        <TextInput
          label="closing remark"
          source="closing_remark"
        />
        <TextInput
          label="Keywords"
          source="keywords"
        />
        <TextInput
          label="Alternate Result"
          source="alternate_result"
        />
      </SimpleForm>
    </Create>
  );

  export const RecentResultEdit = (props) => (
    <Edit {...props} undoable={false}>
      <SimpleForm submitOnEnter={false}>
      <AutocompleteInput source="product_type" label="Product Type" choices={ProductType} />
      <TextInput
          label="retult title"
          source="product_name"
        />
        <TextInput
          label="result brand"
          source="product_brand"
        />
        <NumberInput label="price" source="product_price" />
        {/* <TextInput label="brand" source="product_brand" validatestring /> */}
        <TextInput
          label="product link"
          source="product_link"
        />
        <TextInput
          label="image Link"
          source="product_thumbnail"
        />
        <TextInput
          label="closing remark"
          source="closing_remark"
        />
        <TextInput
          label="Keywords"
          source="keywords"
        />
        <TextInput
          label="Alternate Result"
          source="alternate_result"
        />
      </SimpleForm>
    </Edit>
  );