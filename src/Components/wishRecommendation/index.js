// import { DateRange } from "@material-ui/icons";
import React from "react";
import {
  Create,
  TextInput,
  SimpleForm,
  AutocompleteInput,
  NumberInput
} from "react-admin";
import { ProductType } from "../../Constants";

export const WishRecommendationCreate = (props) => (
    <Create {...props}>
      <SimpleForm submitOnEnter={false}>
        <AutocompleteInput source="product_type" label="Product Type" choices={ProductType} />
        <TextInput source="keywords" label="Keywords"/>
        <NumberInput source="max_budget" label="Budget" />
      </SimpleForm>
    </Create>
  );