
function largeres(req, res) {
  // res.setHeader('X-Content-Type-Options', 'nosniff')
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'Transfer-Encoding': 'chunked'
  })
  res.write("[")
  for (let i = 1; i <= 10000; i++) {
    res.write(`${JSON.stringify(`item${i}: John Doe ${i}`)},`)
  }
  res.write("]")
  res.end()
}

export default largeres
