const fs = require('fs')

let file = 'sample.txt'
let size = fs.statSync(file).size
let acc = 0

let words = {}

let buffer = ''
fs.createReadStream(file)
  .on('data', chunk => {
    // console.log('last', buffer)
    buffer += chunk
    acc += chunk.length
    let match = buffer.match(/(\w+)/g)
    // console.log('new first 3', match.slice(0, 5))
    // console.log('new last 3', match.slice(-5))
    buffer = match.pop()
    match.forEach(word => {
      let count = words[word] || 0
      words[word] = count + 1
    })
  })
  .on('end', () => {
    clearInterval(timer)
    process.stdout.write(`\r done \n`)
    console.log(words)
  })

let timer = setInterval(() => {
  let progress = ((acc / size) * 100).toFixed(2)
  process.stdout.write(`\r ${progress}%`)
}, 200)
