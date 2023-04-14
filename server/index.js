const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require('ethereum-cryptography/secp256k1');
const {toHex,utf8ToBytes} = require('ethereum-cryptography/utils');


app.use(cors());
app.use(express.json());

const balances = {
  "02206e657cae9e9af1da34a058c203276fb0017f38610825a65a7b6eedae240e11": 100,
  // 1e7e765589bdcc55d1a3331687781bebc9663a666b3a417d38cc77d2daf1e43e
  "03a9d0bc27182bfca515c0107e74e746542742d81cd6d1887f37385a0000c4e8d6": 50,
  // c54dbb773d59a7d63db0fa4b5e35972c4b0434f8757942ed1344776393657e23
  "03d25fc46b949e61780ba5b7fd06a66336fbdf37724b35109a415bb752b8e4c0f2": 75,
  // d12a9cb335592a47536e14807f4fcb85cecaf37782ca676f6ffcf3fb3005f2ee
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient,hash,amount,r,s} = req.body;
console.log(s)
console.log(r)
console.log(hash);
// const issigned = secp.secp256k1.verify({r:r,s:s})
const imp =utf8ToBytes("c54dbb773d59a7d63db0fa4b5e35972c4b0434f8757942ed1344776393657e23")
const issigned = secp.secp256k1.verify({r:r,s:s},imp,sender);
console.log(issigned);
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
