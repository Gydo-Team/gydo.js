const ping = async (va, client) => {
  const code = va.code
  
  const res = code
  .split("%ping").join(`${client.ws.ping}`)
}

// module.exports = ping