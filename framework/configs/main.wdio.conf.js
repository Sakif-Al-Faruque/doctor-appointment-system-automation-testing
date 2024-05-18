import path from 'node:path';
import fs from 'fs-extra';
import fs1 from 'fs';
import Logger from '../utils/Logger.js';
import allure from "allure-commandline";

const allureDir = path.resolve("./report/allure/");
/* const allureDir = "./report/allure/"; */

export const downloadDir = path.resolve('./tmp');

export const mainConfig = {
    runner: 'local',
    exclude: [
    ],
    maxInstances: 1,
    logLevel: 'warn',
    bail: 0,
    waitforTimeout: 0,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: allureDir+'/allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    onPrepare: function() {
        fs.ensureDir(downloadDir);
    },

    after: function (result, capabilities, specs) {
        fs.emptyDir(downloadDir);
    },

    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },

    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', allureDir+'/allure-results', '--clean', '-o', allureDir+'/test-reports'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                /* console.log() */
                Logger.info('Allure report successfully generated');
                resolve()
            })
        })
    },

    beforeSuite: async function (){
        try{
            if(fs.existsSync(allureDir)){
                fs.rmSync(allureDir, {recursive: true})
            }
        }catch(err){
            Logger.error('file failure');
            fs.mkdirSync(allureDir, {recursive: true});
            Logger.info('Allure dir got created');
        }
    }

}
