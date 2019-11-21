/** REACT */
import React, { FC, Fragment, useEffect, useState } from 'react';

/** REDUX */
import { useSelector } from 'react-redux';
import { AppState } from 'store';

/** MATERIAL */
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

/** STYLES */
import clsx from 'clsx';
import { useStyles } from './List.styles';

/** COMPONENTS */
import ListItem from './ListItem';

/** TYPES */
import { IArgument, ICommand, WindowMode } from 'types';

/** PROPS */
interface IProps {
    title: string;
    items: { [id: string]: IArgument } | { [id: string]: ICommand };
    order: string[];
    archive: string[];
    onArchive: (id: string) => void;
    onClick?: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    onRestore: (id: string) => void;
    titleRenderer?: (item: IArgument | ICommand, archived: boolean) => any;
}

const List: FC<IProps> = (props) => {
    const classes = useStyles();
    const [ showArchive, setShowArchive ] = useState(false);
    const condensed = useSelector((state: AppState) => state.settings.windowMode === WindowMode.CONDENSED);
    const toggleArchive = () => setShowArchive(!showArchive);

    useEffect(() => {
        if (!props.archive.length && showArchive) {
            setShowArchive(false);
        }
    }, [props.archive]);

    const listItems = (archived: boolean) => props[archived ? 'archive' : 'order'].map((id: string) => {
        const item = props.items[id];
        return (
            <ListItem
                key={`${archived ? 'archived-' : ''}item--${item.id}`}
                item={item}
                archived={archived}
                onArchive={props.onArchive}
                onClick={props.onClick}
                onDelete={props.onDelete}
                onEdit={props.onEdit}
                onRestore={props.onRestore}
                titleRenderer={props.titleRenderer}
                condensed={condensed}
            />
        );
    });

    const renderButton = () => condensed ? <Fragment/> : (
        <Button
            color='secondary'
            className={classes.headerButton}
            disabled={(!props.archive.length && !showArchive)}
            onClick={toggleArchive}
        >
            {showArchive ? props.title : 'Archive'}
        </Button>
    );

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Typography
                    variant={condensed ? 'h6' : 'h5'}
                    className={clsx(classes.title, {[classes.condensed]: condensed})}
                >
                    {props.title}{showArchive ? ' Archive' : ''}
                </Typography>
                {renderButton()}
            </div>
            <Divider/>
            <div className={classes.listOuter}>
                <div className={classes.listInner}>
                    {showArchive ? listItems(true) : listItems(false)}
                </div>
            </div>
        </div>
    );
};

export default List;
