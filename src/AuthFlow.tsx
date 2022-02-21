import { urbitVisor } from "@dcspark/uv-core";
import { useState, useEffect } from "react";
import { url } from "./creds";
import {makeDM} from "./lib/graph";

function AuthFlow(props) {
  const { setRealShip } = props;
  const [ship, setShip] = useState("");

  useEffect(() => {
    urbitVisor.require(["shipName"], setData);
    return () => {}
  }, []);
  function setData() {
    urbitVisor.getShip().then((res) => setShip("~" + res.response));
  }
  return <>{ship.length 
    ? <Claim ship={ship} setResult={setRealShip} /> 
    : <None />}</>;
}

export default AuthFlow;

function None() {
  return (
    <div className="authPage">
      <p>Confirming you have a ship and aren't poor...</p>
      <p>
        Need an <a href="https://urbit.live/">Urbit ID</a>?
      </p>
      <p>
        Need to install{" "}
        <a href="https://github.com/dcSpark/urbit-visor">Urbit Visor</a>? (Also
        in the{" "}
        <a href="https://chrome.google.com/webstore/detail/urbit-visor/oadimaacghcacmfipakhadejgalcaepg">
          Chrome Web Store
        </a>
        )
      </p>
    </div>
  );
}
function Claim({ ship, setResult }) {

  const [token, setToken] = useState("");
  const [host, setHost] = useState("");
  const [failed, setFailed] = useState(null);
  const [loading, setLoading] = useState(false);
  async function initiateAuth() {
    const opts = {
      method: "POST",
      body: ship,
    };
    const res = await fetch(url + "/~initiateAuth", opts);
    const jon = await res.json();
    const body = makeDM(ship, jon.source, [{ text: jon.token }])
    const pokeObj = { app: "dm-hook", mark: "graph-update-3", json: body };
		urbitVisor.poke(pokeObj).then((res) => {
      setLoading(true);
      setTimeout(checkAuth, 2000)
    });
  }
  async function checkAuth(){
    const opts = {
      method: "POST",
      body: ship,
    };
    const res = await fetch(url + "/~checkAuth", opts);
    const json = await res.json();
    if (json.status === "true")
    setResult(ship)
    else setFailed(true)
    setLoading(false);
  }
  return (
    <div className="authPage">
      {loading &&  <p>Checking... </p>}
      {failed && <p>You are a damned impostor!</p> }
      {!loading && !failed  && 
       <>
       <p>So you say you are {ship}. Care to prove it?</p>
       <button className="btn" onClick={initiateAuth}>Sure</button>
     </>
      }
    </div>
  );
}
