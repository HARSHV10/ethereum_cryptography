import { useState } from "react";
import server from "./server";
import {secp256k1} from 'ethereum-cryptography/secp256k1';

function Transfer({ address, setBalance ,signature,hash}) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [r, setR] = useState("");
  const [s, setS] = useState("");
  const [h,sethash]=useState(hash);
  const setValue = (setter) => (evt) => setter(evt.target.value);
  if(Object.keys(signature).length !=0 ){
    const isSigned = secp256k1.verify(signature, hash, '03a9d0bc27182bfca515c0107e74e746542742d81cd6d1887f37385a0000c4e8d6');
    console.log(isSigned);
    console.log(signature);
    }
  async function transfer(evt) {
    evt.preventDefault();

    try {
      const {
        data: { balance },
      } = await server.post(`send`, 
      { s:s,
        r:r,
        hash:h,
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      });
      // now let us consider that the sender is sening us the signature rather than the address ir the private key 
      // 
      console.log(balance)
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
        <input
          placeholder="enter the s signature"
          value={s}
          onChange={setValue(setS)}
        ></input>
        <input
          placeholder="enter the r value "
          value={r}
          onChange={setValue(setR)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
