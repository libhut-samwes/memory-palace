import { patp2dec } from "../ob/co";

function makeIndex() {
  const DA_UNIX_EPOCH = BigInt("170141184475152167957503069145530368000");
  const DA_SECOND = BigInt("18446744073709551616");
  const timeSinceEpoch = (BigInt(Date.now()) * DA_SECOND) / BigInt(1000);
  return "/" + (DA_UNIX_EPOCH + timeSinceEpoch).toString();
}
export function makeDM(ship, recipient, contents){
const i = makeIndex();
    const post = {
      author: ship,
      contents: contents,
      hash: null,
      index: i,
      signatures: [],
      "time-sent": Date.now(),
    };
    const index = `/${patp2dec(recipient)}${i}`;
    const nodes = {};
    nodes[index] = { post: post, children: null };
    return {
      "add-nodes": {
        resource: {
          ship: ship,
          name: "dm-inbox",
        },
        nodes: nodes,
      },
    }; 
  }