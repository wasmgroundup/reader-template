import assert from 'node:assert';
import {basename} from 'node:path';
import process from 'node:process';
import {default as nodeTest} from 'node:test';
import {fileURLToPath} from 'node:url';

function makeTestFn(url) {
  const filename = fileURLToPath(url);
  // Return a function with the same interface as Node's `test` function.
  return (name, ...args) => {
    // Only register the test if the current module is on the command line.
    // All other tests are ignored.
    if (process.argv[1] === filename) {
      // Add the chapter name to the test description.
      const chapterName = basename(filename, '.js');
      nodeTest(`[${chapterName}] ${name}`, ...args);
    }
  };
}

const test = makeTestFn(import.meta.url);

// Your code goes here.
