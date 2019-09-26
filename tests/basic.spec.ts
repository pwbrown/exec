/** SPECTRON */
import { join } from 'path';
import { Application } from 'spectron';

describe('Window Functionality', () => {
    let app: Application;
    beforeEach(() => {
        app = new Application({
            args: [join(__dirname, '../app/build/main.js')],
            path: join(__dirname, '../node_modules/.bin/electron'),
        });
        return app.start();
    });

    afterEach(() => {
        if (app && app.isRunning()) {
            return app.stop();
        }
    });

    it('shows an initial window', () => {
        return app.client.getWindowCount().then((count) => {
            expect(count).toEqual(1);
        });
    });
});
