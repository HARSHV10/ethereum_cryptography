import server from "./server";
import * as spec from 'ethereum-cryptography/secp256k1';
import {secp256k1} from 'ethereum-cryptography/secp256k1';
import {toHex} from 'ethereum-cryptography/utils';
import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";
import { useState } from "react";

function Wallet({ address, setAddress, balance, setBalance,privateKey,setprivateKey,signature,setsignature,hash,setHash }) {

  async function onChange(evt) {
    const privateKey = evt.target.value;
    setprivateKey(privateKey);
    const address = toHex(spec.secp256k1.getPublicKey(privateKey));
///////////////////////////////////////////////////////////////
////////////////////  making the Hash for the address 

// function make a signature 
const hash = utf8ToBytes(privateKey);
setHash(hash);
const signature = secp256k1.sign(hash, privateKey);
const isSigned = secp256k1.verify(signature, hash, '03a9d0bc27182bfca515c0107e74e746542742d81cd6d1887f37385a0000c4e8d6');
console.log(isSigned)
setsignature(signature)
console.log(signature);
// console.log(s);
// setRecovery(recovery)
    // console.log(address)

    // getting the recovery 
    // const recover = secp256k1.
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
        Private Key
        <input placeholder="enter your private key" value={privateKey} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
      
      
    </div>
  );
}

export default Wallet;
