import {StandardProps} from "@material-ui/core";
import {FieldsOptions} from "./EditablePage";
import {FormikProps, getIn} from "formik";

/**
 * Output Odahu component properties.
 */
export interface OdahuComponentProperties {
    name: string;
    error: boolean;
    value: unknown;
    helperText: string;
    onChange: StandardProps<any, any>['onChange'];
}

/**
 * Input formik properties.
 */
export interface FormikProperties {
    name: string;
    description?: string;
}

/**
 * The function is used to automatically extract and process the formik parameters
 * from its context and propagate to the Odahu React Components.
 * It must be inside the formik context, (i.e. a descendent of a <Formik> component or
 * withFormik higher-order component).
 */
export function calculateFormikFieldProperties<T>(
    formik: FormikProps<T>,
    fieldsOptions: FieldsOptions,
    name: FormikProperties["name"],
    description: FormikProperties["description"] = '',
): OdahuComponentProperties {
    const errorMessage = getIn(formik.errors, name);
    const value = getIn(formik.values, name);
    const touched = getIn(formik.touched, name);
    const isError = (fieldsOptions.isValidatorActivated || touched) && !!errorMessage;

    const change = (e: any) => {
        e.persist();
        formik.handleChange(e);
        formik.setFieldTouched(name, true, false);
    };

    return {
        error: isError,
        helperText: isError ? errorMessage : description,
        name: name,
        onChange: change,
        value: value,
    }
}
