import * as React from "react";
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput,
    Show, RichTextField, ReferenceManyField, BooleanField, NumberField, TabbedShowLayout, Tab, TopToolbar  } from 'react-admin';
import { Typography } from "@material-ui/core";
// import BookIcon from '@material-ui/core/svg-icons/action/book';
// export const PostIcon = BookIcon;

const Aside = () => (
    <div style={{ width: 200, margin: '1em' }}>
        <Typography variant="h6">Customer details</Typography>
        <Typography variant="body2">
            Customer will only be published only the consumer
        </Typography>
    </div>
);

export const CustomerList = (props) => (
    <List aside={<Aside />} title="List of Customers" {...props} >
        <Datagrid rowClick="show">
            <TextField source="name" />
            <TextField source="email" />
            <TextField source="mobile" />
            <EditButton />
        </Datagrid>
    </List>
);

export const CreateCustomer = (props) => (
    <Create title="Create a new Customer" {...props}>
        <SimpleForm>
            <div>
                <TextInput source="name" label="Firstname Lastname " />
                <TextInput source="email" label="Email" />
                <TextInput source="mobile" label="Moible Number" />
            </div>
        </SimpleForm>
    </Create>
);



export const CustomerTitle = (record) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const CustomerEdit = (props) => (
    <Edit title={<CustomerTitle />} {...props}>
        <SimpleForm>
            <div>
                <TextInput disabled source="id" />
                <TextInput source="title" label="I Customer to buy" />
                <DateInput source="byDate" label="By date" />
            </div>
            <div>
                <TextInput source="minBudget" label="min ₹ " />
                <TextInput source="maxBudget" label="max ₹ " />
            </div>
            <TextInput multiline source="description" label="Description" options={{ multiLine: true }} />

        </SimpleForm>
    </Edit>
);

const CustomerActions = (basePath, data) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />
        {/* Add your custom actions */}
        <Button color="primary">Custom Action</Button>
    </TopToolbar>
);


export const CustomerDetails = (props) => (
    <Show actions={<CustomerActions />}  {...props} title="Customer Details" >
        <TabbedShowLayout>
            <Tab label="summary">
                <TextField label="Id" source="id" />
                <TextField source="title" />
                <TextField source="teaser" />
            </Tab>
            <Tab label="body" path="body">
                <RichTextField source="description" addLabel={false} />
            </Tab>
            <Tab label="Miscellaneous" path="miscellaneous">
                <TextField label="Password (if protected post)" source="password" type="password" />
                <DateField label="Publication date" source="published_at" />
                <NumberField source="average_note" />
                <BooleanField label="Allow comments?" source="commentable" defaultValue />
                <TextField label="Nb views" source="views" />
            </Tab>
            <Tab label="My Wishes" path="wish">
                <ReferenceManyField reference="api/customer/wish" target="post_id" addLabel={false}>
                    <Datagrid>
                        <TextField source="title" />
                        <DateField source="byDate" />
                        <TextField source="minBudget" />
                        <TextField source="maxBudget" />
                        <TextField source="description" />
                        <TextField source="status" />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);



