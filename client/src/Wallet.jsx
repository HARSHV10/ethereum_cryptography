import server from "./server";
import * as spec from 'ethereum-cryptography/secp256k1';
import {toHex} from 'ethereum-cryptography/utils';

function Wallet({ address, setAddress, balance, setBalance,privateKey,setprivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setprivateKey(privateKey);
    const address = toHex(spec.secp256k1.getPublicKey(privateKey));
    console.log(address)
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
