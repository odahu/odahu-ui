import React from 'react';
import {AppBar, Box, makeStyles, Tab, Tabs, Theme, Typography} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
}));

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

export interface ViewPageProps {
    loading: boolean;
    notFound: boolean;
    tabHeaders: string[];
    tabValues: React.ReactElement[];
}

export const ViewPage: React.FC<ViewPageProps> = (props) => {
    const classes = useStyles();

    // Tab switcher logic
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    if (props.loading) {
        return (
            <Skeleton variant="rect" width={"100%"} height={400}/>
        )
    }

    if (props.notFound) {
        return <p>404 Not Found</p>
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    centered
                >
                    {
                        props.tabHeaders.map(header => (
                            <Tab
                                key={header}
                                label={header}
                            />
                        ))
                    }
                </Tabs>
            </AppBar>
            {
                props.tabValues.map((tab, index) => (
                    <TabPanel
                        value={value}
                        index={index}
                        key={index}
                    >
                        {tab}
                    </TabPanel>
                ))
            }
        </div>
    )
};
