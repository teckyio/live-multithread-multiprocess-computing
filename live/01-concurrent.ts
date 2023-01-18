async function handleRequest(req, res) {

  // using CPU
  let user = {req.body, req.params}

  // using CPU
  let sql = "select id from users where ..."
  let params = [user.username, user.password]

  // using Networking
  let result = await client.query(sql, params)

  // using CPU, memory
  let users = result.rows.map(row => row.id)

  // using Network
  res.json({users})

}
