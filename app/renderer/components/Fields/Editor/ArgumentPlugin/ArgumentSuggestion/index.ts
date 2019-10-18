/** DECORATOR PIECIES */
import ArgumentSuggestion from './ArgumentSuggestion';
import ArgumentSuggestionStrategy from './ArgumentSuggestion.strategy';

export default () => ({
    component: ArgumentSuggestion,
    strategy: ArgumentSuggestionStrategy,
});
