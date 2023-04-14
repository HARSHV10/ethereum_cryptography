import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setprivateKey] = useState("");
  const [signature, setsignature] = useState({});
  const [Recovery, setRecovery] = useState("");
  const [Hash, setHash] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        privateKey={privateKey}
        signature={signature}
        setsignature={setsignature}
        Recovery={Recovery}
        setRecovery={setRecovery}
        setprivateKey={setprivateKey}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        setHash={setHash}
        Hash={Hash}
      />
      <Transfer setBalance={setBalance} address={address} signature={signature} hash={Hash} />
    </div>
  );
}

export default App;
