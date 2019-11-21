/** REACT */
import React, { FC, useRef } from 'react';
import { render } from 'react-dom';

/** ELECTRON */
import { ipcRenderer as ipc } from 'electron';

/** COMPONENTS */
import Form from '../Form/Form';

/** PROVIDERS */
import Providers from '../Providers/Providers';

/** REDUX */
import { useSelector } from 'react-redux';
import { AppState } from 'store';

/** FIELDS */
import { useExecutorFields } from './Executor.hooks';

/** STYLES */
import { useStyles } from './Executor.styles';

/** TYPES */
import { ICommand } from 'types';

/** Listen for Background Events */
import 'store/background';

const Executor: FC = () => {
    const classes = useStyles();
    const commandId = useRef<string>(ipc.sendSync('executeSync:id')).current;
    const command = useRef<ICommand>(
        useSelector((state: AppState) => state.command.commands[commandId])).current;

    const { fields, validate } = useExecutorFields(command);

    const cancel = () => ipc.send('execute:cancel');
    const run = () => {
        const result = validate();
        if (result.valid) {
            ipc.send('execute:arguments', result.values);
        }
    };

    return (
        <div className={classes.container}>
            <Form
                title={command.label}
                confirmText='Run'
                onCancel={cancel}
                onConfirm={run}
            >
                {fields}
            </Form>
        </div>
    );
};

render((<Providers><Executor/></Providers>), document.getElementById('executor'));
