import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import {Paper} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import {Formik, useFormikContext} from "formik";
import {ObjectSchema} from "yup";
import {useDispatch} from "react-redux";
import {SaveButtonClick} from "./actions";

const specificationTitle = 'Specification';
const metadataTitle = 'Metadata';
const reviewTitle = 'Review';

export const editPageStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        margin: {
            margin: theme.spacing(1),
        },
        fieldsContainer: {
            display: "flex",
            flexDirection: 'column',
            paddingTop: "20px"
        },
        fields: {
            margin: "20px",
            maxWidth: "30%"
        },
    }),
);

interface SpecStepProps<T> {
    fields: React.ReactElement;
    schema: ObjectSchema;
    handleBack: () => void;
    handleNext: () => void;
    setFieldOptions: (fieldOptions: FieldsOptions) => void;
}

function SpecStep<T>(
    {
        handleBack, handleNext, fields,
        schema, setFieldOptions
    }: SpecStepProps<T>
): React.ReactElement {
    const classes = editPageStyles();
    const formik = useFormikContext<T>();

    return (
        <>
            <div className={classes.fieldsContainer}>
                {fields}
            </div>
            <div>
                <div>
                    <Button
                        onClick={handleBack}
                        className={classes.button}
                        variant="outlined"
                    >
                        Back
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setFieldOptions({isValidatorActivated: true});

                            if (schema.isValidSync(formik.values)) {
                                handleNext();
                            }
                        }}
                        className={classes.button}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    )
}

interface MetadataStepProps<T> {
    handleNext: () => void;
    fields: React.ReactElement;
    schema: ObjectSchema;
    setFieldOptions: (fieldOptions: FieldsOptions) => void;
}

function MetadataStep<T>(props: MetadataStepProps<T>) {
    const classes = editPageStyles();
    const formik = useFormikContext<T>();
    const {
        handleNext,
        fields,
        schema,
        setFieldOptions
    } = props;

    return (
        <>
            <div className={classes.fieldsContainer}>
                {fields}
            </div>
            <div>
                <div>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setFieldOptions({isValidatorActivated: true});

                            if (schema.isValidSync(formik.values)) {
                                handleNext();
                            }
                        }}
                        className={classes.button}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    )
}

interface ReviewStepProps<T> {
    values: T;
    handleBack: () => void;
    fields: React.ReactElement;
}

function ReviewStep<T>(props: ReviewStepProps<T>) {
    const classes = editPageStyles();

    return (
        <>
            {props.fields}
            <div>
                <Button
                    onClick={props.handleBack}
                    className={classes.button}
                    variant="outlined"
                >
                    Back
                </Button>
                <Button
                    variant="outlined"
                    type="submit"
                    className={classes.button}
                >
                    Submit
                </Button>
            </div>
        </>
    )
}

export interface Schemas {
    metadata: ObjectSchema;
    spec: ObjectSchema;
}

export interface FieldsOptions {
    isValidatorActivated: boolean;
}

export interface Fields<T> {
    metadata: () => React.ReactElement;
    spec: () => React.ReactElement;
    review: (entity: T) => React.ReactElement;
}

export interface EditPageProps<T> {
    entity: T;
    title: string;
    schemas: Schemas;
    fields: Fields<T>;
    saveButtonClick: SaveButtonClick<T>;
    processBeforeSubmit?: (t: T) => T;
}

const ValidateForm: React.FC = () => {
    const {validateForm, values} = useFormikContext();

    React.useEffect(() => {
        validateForm(values);
    }, []);

    return null;
};

export const FieldsOptionsContext = React.createContext<FieldsOptions>({
    isValidatorActivated: false
});

export function EditablePage<T extends { id?: string }>(props: EditPageProps<T>): React.ReactElement {
    const {
        entity,
        title,
        fields,
        schemas,
        saveButtonClick,
        processBeforeSubmit,
    } = props;
    const classes = editPageStyles();
    // TODO: fix typing
    const dispatch: any = useDispatch();

    const [activeStep, setActiveStep] = React.useState<number>(0);
    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const [metadataFieldOptions, setMetadataFieldOptions] = React.useState<FieldsOptions>({
        isValidatorActivated: false,
    });

    const [specFieldOptions, setSpecFieldOptions] = React.useState<FieldsOptions>({
        isValidatorActivated: false,
    });

    return (
        <div className={classes.root}>
            <Paper>
                <Formik
                    initialValues={entity}
                    validationSchema={schemas.spec}
                    onSubmit={values => {

                        if (processBeforeSubmit) {
                            values = processBeforeSubmit(values);
                        }

                        saveButtonClick.handle(values, dispatch);
                    }}
                >
                    {
                        (formik) => (
                            <form onSubmit={formik.handleSubmit}>
                                <Typography
                                    style={{padding: "15px"}}
                                    variant="h6"
                                >
                                    {title}
                                </Typography>
                                <Stepper
                                    activeStep={activeStep}
                                    orientation="vertical"
                                >
                                    <Step key={metadataTitle}>
                                        <StepLabel>{metadataTitle}</StepLabel>
                                        <StepContent>
                                            <FieldsOptionsContext.Provider value={metadataFieldOptions}>
                                                <MetadataStep
                                                    handleNext={handleNext}
                                                    fields={fields.metadata()}
                                                    schema={schemas.metadata}
                                                    setFieldOptions={setMetadataFieldOptions}
                                                />
                                            </FieldsOptionsContext.Provider>
                                        </StepContent>
                                    </Step>
                                    <Step key={specificationTitle}>
                                        <StepLabel>{specificationTitle}</StepLabel>
                                        <StepContent>
                                            <FieldsOptionsContext.Provider value={specFieldOptions}>
                                                <SpecStep
                                                    schema={props.schemas.spec}
                                                    handleBack={handleBack}
                                                    handleNext={handleNext}
                                                    fields={fields.spec()}
                                                    setFieldOptions={setSpecFieldOptions}
                                                />
                                            </FieldsOptionsContext.Provider>
                                        </StepContent>
                                    </Step>
                                    <Step key={reviewTitle}>
                                        <StepLabel>{reviewTitle}</StepLabel>
                                        <StepContent>
                                            <ReviewStep
                                                values={formik.values}
                                                handleBack={handleBack}
                                                fields={fields.review(formik.values)}
                                            />
                                        </StepContent>
                                    </Step>
                                    <ValidateForm/>
                                </Stepper>
                            </form>
                        )
                    }
                </Formik>
            </Paper>
        </div>
    );
}
