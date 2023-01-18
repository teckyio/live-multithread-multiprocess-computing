const fs = require('fs')

function countFile(file) {
	let text = fs.readFileSync(file).toString()
	let words = text.match(/(\w+)/g)
	let counts = {}
	for (let word of words){
		let count = counts[word] || 0
		counts[word] = count + 1
	}
	// console.log(counts)
	return counts
}

let systemStart = Date.now()

function test(file){
	console.log('start scanning:', file)
	let taskStart = Date.now()
	let counts = countFile(file)
	let taskEnd = Date.now()
	let taskUsed = taskEnd - taskStart
	console.log('finished scanning:', file, 'used', taskUsed, 'ms')
	return counts
}

let result1 = test('sample-1.txt')
let result2 = test('sample-2.txt')
let result3 = test('sample-3.txt')

let results = {}

function combineResult(taskResult) {
	for (let word in taskResult) {
		let count = results[word] || 0
		count += taskResult[word]
		results[word] = count
	}
}

let combineStart = Date.now()

combineResult(result1)
combineResult(result2)
combineResult(result3)

let combineEnd = Date.now()
let combineUsed = combineEnd - combineStart

console.log('combine used', combineUsed, 'ms')

// console.log(results)

let systemEnd = Date.now()

let totalUsed = systemEnd - systemStart

console.log('total used', totalUsed, 'ms')