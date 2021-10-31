'use strict';

const pixelChange = require('../index');

const {readFileSync} = require('fs');

const {resolve} = require('path');

const assert = require('assert');

const {deepStrictEqual, throws} = assert;

const {promisify} = require('util');

const sleep = promisify(setTimeout);

const drawArr = [false, true];

const responseArr = ['percent', 'bounds', 'blobs'];

(async () => {
    try {
        for (let draw of drawArr) {
            for (let response of responseArr) {
                console.log(`\n⚙️⚙️⚙️ draw: ${draw}, response: ${response} ⚙️⚙️⚙️`);

                let errMsg;

                let engine;

                let compare;

                let width;

                let height;

                let depth;

                let size;

                let pixelsArray;

                let resultArray;

                let expectedArray;

                /* --------------------------------------------------------------------------------------------------------------------*/

                // basic test for factory constructor

                assert(typeof pixelChange === 'function' && pixelChange.name === 'CreateObject', `❌  typeof pixelChange === 'function' && pixelChange.name === 'CreateObject'`);

                width = 100;

                height = 100;

                depth = 1;

                errMsg = 'A configuration object was expected { width, height, depth }';

                throws(
                    () => {
                        engine = pixelChange();
                    },
                    {
                        message: errMsg
                    },
                    `❌  ${errMsg}`
                );

                console.log(`✅  Assert = Error: ${errMsg}`);

                errMsg = 'Width must be an integer greater than 0';

                throws(
                    () => {
                        engine = pixelChange({});
                    },
                    {
                        message: errMsg
                    },
                    `❌  ${errMsg}`
                );

                console.log(`✅  Assert = Error: ${errMsg}`);

                errMsg = 'Width must be an integer greater than 0';

                throws(
                    () => {
                        engine = pixelChange({width: 0, height: 1, depth: 1});
                    },
                    {
                        message: errMsg
                    },
                    `❌  ${errMsg}`
                );

                console.log(`✅  Assert = Error: ${errMsg}`);

                errMsg = 'Width must be an integer greater than 0';

                throws(
                    () => {
                        engine = pixelChange({width: '1', height: 1, depth: 1});
                    },
                    {
                        message: errMsg
                    },
                    `❌  ${errMsg}`
                );

                console.log(`✅  Assert = Error: ${errMsg}`);

                errMsg = 'Height must be an integer greater than 0';

                throws(
                    () => {
                        engine = pixelChange({width: 1});
                    },
                    {
                        message: errMsg
                    },
                    `❌  ${errMsg}`
                );

                console.log(`✅  Assert = Error: ${errMsg}`);

                errMsg = 'Height must be an integer greater than 0';

                throws(
                    () => {
                        engine = pixelChange({width: 1, height: 0, depth: 1});
                    },
                    {
                        message: errMsg
                    },
                    `❌  ${errMsg}`
                );

                console.log(`✅  Assert = Error: ${errMsg}`);

                errMsg = 'Height must be an integer greater than 0';

                throws(
                    () => {
                        engine = pixelChange({width: 1, height: '1', depth: 1});
                    },
                    {
                        message: errMsg
                    },
                    `❌  ${errMsg}`
                );

                console.log(`✅  Assert = Error: ${errMsg}`);

                errMsg = 'Depth must be an integer set to 1, 3, or 4';

                throws(
                    () => {
                        engine = pixelChange({width: 1, height: 1});
                    },
                    {
                        message: errMsg
                    },
                    `❌  ${errMsg}`
                );

                console.log(`✅  Assert = Error: ${errMsg}`);

                errMsg = 'Depth must be an integer set to 1, 3, or 4';

                throws(
                    () => {
                        engine = pixelChange({width: 1, height: 1, depth: 0});
                    },
                    {
                        message: errMsg
                    },
                    `❌  ${errMsg}`
                );

                console.log(`✅  Assert = Error: ${errMsg}`);

                errMsg = 'Depth must be an integer set to 1, 3, or 4';

                throws(
                    () => {
                        engine = pixelChange({width: 1, height: 1, depth: '1'});
                    },
                    {
                        message: errMsg
                    },
                    `❌  ${errMsg}`
                );

                console.log(`✅  Assert = Error: ${errMsg}`);

                // console.log('✅  Assert = Minimum values required to NOT throw');

                errMsg = 'Draw must be a boolean';

                throws(
                    () => {
                        engine = pixelChange({width: 1, height: 1, depth: 1, draw: 1});
                    },
                    {
                        message: errMsg
                    },
                    `❌  ${errMsg}`
                );

                console.log(`✅  Assert = Error: ${errMsg}`);

                errMsg = 'Draw must be a boolean';

                throws(
                    () => {
                        engine = pixelChange({width: 1, height: 1, depth: 1, draw: 'true'});
                    },
                    {
                        message: errMsg
                    },
                    `❌  ${errMsg}`
                );

                console.log(`✅  Assert = Error: ${errMsg}`);

                errMsg = 'Response must be a string set to percent, bounds, or blobs';

                throws(
                    () => {
                        engine = pixelChange({width: 1, height: 1, depth: 1, response: 1});
                    },
                    {
                        message: errMsg
                    },
                    `❌  ${errMsg}`
                );

                console.log(`✅  Assert = Error: ${errMsg}`);

                engine = pixelChange({width: width, height: height, depth: depth});

                assert(typeof engine.compare === 'function' && engine.compare.name === 'compare', `❌  typeof engine.compare === 'function' && engine.compare.name === 'compare'`);

                assert(
                    typeof engine.compareSync === 'function' && engine.compareSync.name === 'compareSync',
                    `❌  typeof engine.compareSync === 'function' && engine.compareSync.name === 'compareSync'`
                );

                // console.log('✅  Assert = Minimum values required to NOT throw');

                /* --------------------------------------------------------------------------------------------------------------------*/

                // gray

                pixelsArray = [];

                resultArray = [];

                expectedArray = [0.11, 1.85, 4.66, 6.51, 7.91, 7.28, 7.87, 6.47, 6.21, 6.61, 7.89, 7.24, 7.9];

                for (let i = 1; i <= 14; ++i) {
                    const pixelPath = resolve(__dirname, '../pixel-change-test/pixels/gray', `gray-${i}.pixels`);

                    pixelsArray.push(readFileSync(pixelPath));
                }

                width = 640;

                height = 360;

                depth = 1;

                size = width * height * depth;

                engine = pixelChange({width, height, depth, draw, response});

                compare = promisify(engine.compare.bind(engine));

                for (let i = 0, j = 1; j <= 13; ++i, ++j) {
                    const results = engine.compareSync(pixelsArray[i], pixelsArray[j]);

                    if (results.length) {
                        resultArray.push(Math.trunc(results[0].percent * 100) / 100);

                        if (results.pixels) {
                            assert(results.pixels.length === size);
                        }
                    }
                }

                deepStrictEqual(resultArray, expectedArray, `❌  gray (sync)`);

                console.log(`✅  gray (sync)`);

                resultArray = [];

                for (let i = 0, j = 1; j <= 13; ++i, ++j) {
                    const results = await engine.compare(pixelsArray[i], pixelsArray[j]);

                    if (results.length) {
                        resultArray.push(Math.trunc(results[0].percent * 100) / 100);

                        if (results.pixels) {
                            assert(results.pixels.length === size);
                        }
                    }
                }

                deepStrictEqual(resultArray, expectedArray, `❌  gray (promise)`);

                console.log(`✅  gray (promise)`);

                resultArray = [];

                for (let i = 0, j = 1; j <= 13; ++i, ++j) {
                    const results = await compare(pixelsArray[i], pixelsArray[j]);

                    if (results.length) {
                        resultArray.push(Math.trunc(results[0].percent * 100) / 100);

                        if (results.pixels) {
                            assert(results.pixels.length === size);
                        }
                    }
                }

                deepStrictEqual(resultArray, expectedArray, `❌  gray (promisified)`);

                console.log(`✅  gray (promisified)`);

                /* --------------------------------------------------------------------------------------------------------------------*/

                // rgb

                pixelsArray = [];

                resultArray = [];

                expectedArray = [0.13, 1.96, 4.96, 6.98, 8.52, 7.84, 8.49, 6.89, 4.88, 7.04, 8.52, 7.8, 8.5];

                for (let i = 1; i <= 14; ++i) {
                    const pixelPath = resolve(__dirname, '../pixel-change-test/pixels/rgb', `rgb-${i}.pixels`);

                    pixelsArray.push(readFileSync(pixelPath));
                }

                width = 640;

                height = 360;

                depth = 3;

                size = width * height * depth;

                engine = pixelChange({width, height, depth, draw, response});

                compare = promisify(engine.compare.bind(engine));

                for (let i = 0, j = 1; j <= 13; ++i, ++j) {
                    const results = engine.compareSync(pixelsArray[i], pixelsArray[j]);

                    if (results.length) {
                        resultArray.push(Math.trunc(results[0].percent * 100) / 100);

                        if (results.pixels) {
                            assert(results.pixels.length === size);
                        }
                    }
                }

                deepStrictEqual(resultArray, expectedArray, `❌  rgb (sync)`);

                console.log(`✅  rgb  (sync)`);

                resultArray = [];

                for (let i = 0, j = 1; j <= 13; ++i, ++j) {
                    const results = await engine.compare(pixelsArray[i], pixelsArray[j]);

                    if (results.length) {
                        resultArray.push(Math.trunc(results[0].percent * 100) / 100);

                        if (results.pixels) {
                            assert(results.pixels.length === size);
                        }
                    }
                }

                deepStrictEqual(resultArray, expectedArray, `❌  rgb (promise)`);

                console.log(`✅  rgb  (promise)`);

                resultArray = [];

                for (let i = 0, j = 1; j <= 13; ++i, ++j) {
                    const results = await compare(pixelsArray[i], pixelsArray[j]);

                    if (results.length) {
                        resultArray.push(Math.trunc(results[0].percent * 100) / 100);

                        if (results.pixels) {
                            assert(results.pixels.length === size);
                        }
                    }
                }

                deepStrictEqual(resultArray, expectedArray, `❌  rgb (promisified)`);

                console.log(`✅  rgb  (promisified)`);

                /* --------------------------------------------------------------------------------------------------------------------*/

                // rgba

                pixelsArray = [];

                resultArray = [];

                expectedArray = [0.12, 1.88, 4.8, 6.73, 8.19, 7.54, 8.17, 6.66, 4.71, 6.8, 8.2, 7.5, 8.19];

                for (let i = 1; i <= 14; ++i) {
                    const pixelPath = resolve(__dirname, '../pixel-change-test/pixels/rgba', `rgba-${i}.pixels`);

                    pixelsArray.push(readFileSync(pixelPath));
                }

                width = 640;

                height = 360;

                depth = 4;

                size = width * height * depth;

                engine = pixelChange({width, height, depth, draw, response});

                compare = promisify(engine.compare.bind(engine));

                for (let i = 0, j = 1; j <= 13; ++i, ++j) {
                    const results = engine.compareSync(pixelsArray[i], pixelsArray[j]);

                    if (results.length) {
                        resultArray.push(Math.trunc(results[0].percent * 100) / 100);

                        if (results.pixels) {
                            assert(results.pixels.length === size);
                        }
                    }
                }

                deepStrictEqual(resultArray, expectedArray, `❌  rgba (sync)`);

                console.log(`✅  rgba (sync)`);

                resultArray = [];

                for (let i = 0, j = 1; j <= 13; ++i, ++j) {
                    const results = await engine.compare(pixelsArray[i], pixelsArray[j]);

                    if (results.length) {
                        resultArray.push(Math.trunc(results[0].percent * 100) / 100);

                        if (results.pixels) {
                            assert(results.pixels.length === size);
                        }
                    }
                }

                deepStrictEqual(resultArray, expectedArray, `❌  rgba (promise)`);

                console.log(`✅  rgba (promise)`);

                resultArray = [];

                for (let i = 0, j = 1; j <= 13; ++i, ++j) {
                    const results = await compare(pixelsArray[i], pixelsArray[j]);

                    if (results.length) {
                        resultArray.push(Math.trunc(results[0].percent * 100) / 100);

                        if (results.pixels) {
                            assert(results.pixels.length === size);
                        }
                    }
                }

                deepStrictEqual(resultArray, expectedArray, `❌  rgba (promisified)`);

                console.log(`✅  rgba (promisified)`);

                /* --------------------------------------------------------------------------------------------------------------------*/

                console.log(`🎉🎉🎉 draw: ${draw}, response: ${response} 🎉🎉🎉\n`);

                await sleep(1000);
            }
        }
    } catch (err) {
        console.error(err);
    }
})();
