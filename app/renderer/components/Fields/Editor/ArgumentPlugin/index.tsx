/** REACT */
import React from 'react';

/** DRAFT */
import {} from 'draft-js';

/** DECORATORS */
import ArgumentSuggestion from './ArgumentSuggestion';

export default () => {
    return {
        decorators: [ ArgumentSuggestion() ],
    };
};
