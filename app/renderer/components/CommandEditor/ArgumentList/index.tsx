/** REACT */
import React, { FC, Fragment } from 'react';

/** MATERIAL */
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

/** PROPS */
import { Connected, Props } from './argumentList.props';

/** COMPONENTS */
import Argument from './Argument';

const ArgumentList: FC<Props> = (props) => {
    const create = () => props.create();
    return (
        <Fragment>
            <Typography style={{ marginTop: 10 }}>
                Arguments
                <Fab
                    size='small'
                    color='secondary'
                    variant='extended'
                    style={{ marginLeft: 5 }}
                    onClick={create}
                >
                    New
                </Fab>
            </Typography>
            <Divider style={{ margin: '5px 0px' }}/>
            <List dense={true}>
                {props.arguments.map((arg, i) => <Argument key={`arg-${arg.id}`} argument={arg} index={i}/>)}
            </List>
        </Fragment>
    );
};

export default Connected(ArgumentList);
