// C: fork()
// Java: new Thread class (extends run() method)
// Node.js: Worker Thread
// Browser js: Web Worker

const fs = require('fs')
const {
	isMainThread,
	Worker,
	parentPort,
	workerData,
} = require('worker_threads')

function countFile(file) {
	let text = fs.readFileSync(file).toString()
	let words = text.match(/(\w+)/g)
	let counts = {}
	for (let word of words){
		let count = counts[word] || 0
		counts[word] = count + 1
	}
	// console.log(counts)
	parentPort.postMessage(counts)
}

let systemStart = Date.now()

function workerTest(file){
	console.log('start scanning:', file)
	let taskStart = Date.now()
	countFile(file)
	let taskEnd = Date.now()
	let taskUsed = taskEnd - taskStart
	console.log('finished scanning:', file, 'used', taskUsed, 'ms')
}

let results = {}
let startedWorkers = 0
let finishedWorkers = 0

function combineResult(taskResult) {
	for (let word in taskResult) {
		let count = results[word] || 0
		count += taskResult[word]
		results[word] = count
	}
}

function mainTest(file) {
	console.log('start worker:', file)
	const worker = new Worker(__filename, {workerData: file})
	startedWorkers++
	worker.on('message', message => {
		console.log('received result from worker:', file)
		finishedWorkers++
		// worker.postMessage('thanks, bye')
		combineResult(message)
		if (startedWorkers == finishedWorkers) {
			console.log('finished', finishedWorkers, 'workers')
			let systemEnd = Date.now()
			let totalUsed = systemEnd - systemStart
			console.log('total used', totalUsed, 'ms')
		}
	})
}

if (isMainThread) {
	console.log('running main thread...')
	mainTest('sample-1.txt')
	mainTest('sample-2.txt')
	mainTest('sample-3.txt')
} else {
	console.log('running worker thread...', {workerData})
	workerTest(workerData)
}

// test('sample-1.txt')
// test('sample-2.txt')
// test('sample-3.txt')

