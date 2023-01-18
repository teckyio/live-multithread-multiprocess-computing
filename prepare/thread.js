const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('worker_threads')

if (isMainThread) {
  console.log('[main thread]', 'creating worker')
  const worker = new Worker(__filename, { workerData: 'sample data' })
  worker.on('message', message => {
    console.log('[main thread]', 'message from worker thread:', message)
  })
  worker.on('error', error => {
    console.error('[main thread]', 'error from worker thread:', error)
  })
  worker.postMessage('more data')
} else {
  console.log('[worker thread]', 'workerData:', workerData)
  parentPort.postMessage('sample response')
  parentPort.on('message', message => {
    console.log('[worker thread]', 'message from parent thread:', message)
    parentPort.postMessage('more response')
  })
}
