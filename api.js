const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser")
const { utils, BigNumber } = require('ethers')
const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())

let nextSupply = BigNumber.from("0x10000000")
let blockNumber = BigNumber.from("0x10000000")

app.post('/', (req, res) => {
    const { id, method, jsonrpc, params } = req.body
    let result, error
    if (method === "eth_chainId") { result = "0x2" }
    if (method === "eth_blockNumber") { 
        result = blockNumber.toHexString()
        blockNumber = blockNumber.add(1)
    }
    if (method === "eth_call" && params[0]?.to === "0x1234567890123456789012345678901234567890") {
        result = "0x0000000000000000000000000000000000000000000000000000000002a2b0b3000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000" + nextSupply.toHexString().replace("0x", "")
        nextSupply = nextSupply.add(1)
     //   error = { code: -32000, message: "header not found" }
    }
    if (!result && !error) { console.log(req.body) }
    else { console.log(`${new Date()}: Served ${method} - params: ${JSON.stringify(params)}`) }
    res.json({ id, method, jsonrpc, result, error })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})