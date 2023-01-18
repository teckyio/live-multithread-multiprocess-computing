const fs = require('fs')

let words = {}

fs.readFileSync('sample.txt')
  .toString()
  .match(/(\w+)/g)
  .forEach(word => {
    let count = words[word] || 0
    words[word] = count + 1
  })

console.log(words)
