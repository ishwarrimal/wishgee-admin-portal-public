import React from "react";
import {
  Edit,
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  minLength,
  TextField,
  Show,
  Toolbar,
  SaveButton,
} from "react-admin";

const PostCreateToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton
      label="Save"
      transform={(data) => ({ ...data, updateResult: true })}
      submitOnEnter={true}
    />
  </Toolbar>
);

const validatestring = [required(), minLength(5)];
const validateBrand = [required(), minLength(2)];

export const ResultCreate = (props) => (
  <Create {...props}>
    <SimpleForm toolbar={<PostCreateToolbar />} redirect="show">
      <TextInput
        label="retult title"
        source="result.product_name"
        validate={validatestring}
      />
      <TextInput
        label="result brand"
        source="result.product_brand"
        validate={validateBrand}
      />
      <NumberInput label="price" source="result.product_price" />
      {/* <TextInput label="brand" source="product_brand" validatestring /> */}
      <TextInput
        label="product link"
        source="result.product_link"
        validate={validatestring}
      />
      <TextInput
        label="image Link"
        source="result.product_thumbnail"
        validate={validatestring}
      />
      <TextInput
        label="closing remark"
        source="result.closing_remark"
        validat={validatestring}
      />
      <TextInput
        label="Keywords"
        source="result.keywords"
      />
      <TextInput
        label="Alternate Result"
        source="result.alternate_result"
      />
    </SimpleForm>
  </Create>
);

export const ResultEdit = (props) => {
  return (
    <Edit {...props} undoable={false}>
      <SimpleForm toolbar={<PostCreateToolbar />} redirect="show">
        <TextInput
          label="retult title"
          source="result.product_name"
          validate={validatestring}
        />
        <TextInput
          label="result brand"
          source="result.product_brand"
          validate={validateBrand}
        />
        <NumberInput label="price" source="result.product_price" />
        {/* <TextInput label="brand" source="product_brand" validatestring /> */}
        <TextInput
          label="product link"
          source="result.product_link"
          validate={validatestring}
        />
        <TextInput
          label="image Link"
          source="result.product_thumbnail"
          validate={validatestring}
        />
        <TextInput
          label="closing remark"
          source="result.closing_remark"
          validat={validatestring}
        />
        <TextInput
          label="Keywords"
          source="result.keywords"
        />
        <TextInput
          label="Alternate Result"
          source="result.alternate_result"
        />
        {/* <SelectInput
          label="Status"
          source="status"
          choices={[
            { id: "PROCESSING", name: "PROCESSING" },
            { id: "PROCESSED", name: "PROCESSED" },
          ]}
        /> */}
      </SimpleForm>
    </Edit>
  );
};

export const ResultView = (props) => {
  return (
    <Show>
      <TextField
        label="retult title"
        source="result.product_name"
        validate={validatestring}
      />
      <TextField
        label="result brand"
        source="result.product_brand"
        validate={validatestring}
      />
      <NumberInput label="price" source="result.product_price" />
      {/* <TextField label="brand" source="product_brand" validatestring /> */}
      <TextField
        label="product link"
        source="result.product_link"
        validate={validatestring}
      />
      <TextField
        label="image Link"
        source="result.product_thumbnail"
        validate={validatestring}
      />
      <TextField
        label="closing remark"
        source="result.closing_remark"
        validat={validatestring}
      />
      <TextField
        label="Alternate Result"
        source="result.alternate_result"
      />
    </Show>
  );
};
