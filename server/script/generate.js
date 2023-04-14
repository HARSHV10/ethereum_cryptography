const secp = require('ethereum-cryptography/secp256k1');
const {toHex} = require('ethereum-cryptography/utils');


const privateKey = secp.secp256k1.utils.randomPrivateKey();

console.log("Private Key = "  , toHex(privateKey) );

// now to get the public key what are we going to do is that 
// this is the corresponding provate key for this public key 

const publicKey = secp.secp256k1.getPublicKey(privateKey);
console.log("Public Key : " ,toHex(publicKey));

//  now let these public key be the address of the wallet 
// in the other case what we can do is that we could ake any other process for the same that could help 
// for example that we could take the hash of the public key and take the last 20 bit of it 
