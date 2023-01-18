const {
  isMainThread,
  Worker,
  workerData,
  parentPort,
} = require('worker_threads')

function diceOnce() {
  return Math.floor(Math.random() * 6 + 1)
}

function diceCombo(n) {
  let acc = 0
  for (let i = 0; i < n; i++) {
    acc += diceOnce()
  }
  return acc == 6 * n
}

function diceUntil() {
  let n = 10
  let i = 0
  for (;;) {
    i++
    if (diceCombo(n)) {
      break
    }
  }
  // console.log('got', n, 'combo in', i, 'attempts')
  parentPort.postMessage({ n, i })
}

if (isMainThread) {
  for (let i = 0; i < 2; i++) {
    const worker = new Worker(__filename)
    worker.on('message', ({ n, i }) => {
      console.log('got', n, 'combo in', i, 'attempts')
    })
  }
} else {
  for (;;) {
    diceUntil()
  }
}
