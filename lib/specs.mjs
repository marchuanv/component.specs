
import { Jasmine, resolve, JUnitXmlReporter, pathJoin } from '../registry.mjs';
export class Specs {
    /**
     * @param { Number } timeOutMill
     * @param { String } specsDirPath
    */
    constructor(timeOutMill, specsDirPath) {
        const projectBaseDir = resolve(specsDirPath);
        const reportDirPath = pathJoin(projectBaseDir, 'reports');
        this._jasmine = new Jasmine({ projectBaseDir });
        this._jasmine.clearReporters();
        this._jasmine.addReporter(new JUnitXmlReporter({
            savePath: reportDirPath,
            consolidateAll: false
        }));
        this._jasmine.jasmine.DEFAULT_TIMEOUT_INTERVAL = timeOutMill;
        this._jasmine.stopSpecOnExpectationFailure(false);
        this._jasmine.err
        this._jasmine.addMatchingSpecFiles([
            `${projectBaseDir}/**/*.spec.mjs`,
            `${projectBaseDir}/**/*-spec.mjs`
        ]);
    }
    async run() {
        await this._jasmine.execute();
    }
}
