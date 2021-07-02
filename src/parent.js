const { Worker: JestWorker} = require('jest-worker');

const wait = t => new Promise(r => setTimeout(r, t));

async function main() {
  const worker = new JestWorker(require.resolve('./worker'), {
    exposedMethods: ['hello'],
      numWorkers: 4,
  });

  await wait(10000);

  console.log(await worker.hello('Alice'));
  global.gc();
  await wait(10000);

  console.log(await worker.hello('Bob'));
  global.gc();
  await wait(10000);

  console.log(await worker.hello('Jack'));
  global.gc();
  await wait(10000);

  const {forceExited} = await worker.end();
  if (forceExited) {
    console.error('Workers failed to exit gracefully');
  }
}

main();