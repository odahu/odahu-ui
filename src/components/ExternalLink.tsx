import React from 'react';
import {Link} from "@material-ui/core";
import {createStyles, makeStyles} from "@material-ui/core/styles";


const useLinkStyles = makeStyles(() =>
    createStyles({
        link: {
            color: '-webkit-link',
            textDecoration: 'underline',
        }
    }),
);

export interface ExternalLinkProps {
    url?: string;
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({url}) => {
    const classes = useLinkStyles();

    return (
        <Link
            className={classes.link}
            color="textPrimary"
            href={url}
            target={"_blank"}
        >
            {url}
        </Link>
    );
};
