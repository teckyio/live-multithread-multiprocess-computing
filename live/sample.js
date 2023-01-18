const fs = require('fs')

let matches = fs.readFileSync('sample.js').toString().match(/(\w+)/g)

let words = (matches = Array.from(new Set(matches)))

// similar to BufferedOutputStream in Java

let totalSize = 1024 * 1024 * 100
let bufferSize = 1024 * 1024 * 8
let acc = 0
let buffer = ''
while (acc < totalSize) {
  let idx = Math.floor(Math.random() * words.length)
  let word = words[idx]
  acc += word.length + 1
  buffer += word + '\n'
  if (buffer.length >= bufferSize) {
    process.stdout.write(buffer)
    buffer = ''
  }
}
process.stdout.write(buffer)
