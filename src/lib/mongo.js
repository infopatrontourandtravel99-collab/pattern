import dns from "node:dns";
import { MongoClient } from "mongodb";

// Returns the database, or null when MONGODB_URI is not configured / unreachable.
const g = globalThis;

const connect = (uri) => new MongoClient(uri, { serverSelectionTimeoutMS: 6000 }).connect();

export async function getDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  try {
    if (!g._mongoPromise) {
      g._mongoPromise = connect(uri).catch((e) => {
        // Some home/office DNS servers refuse the SRV lookup Atlas needs; retry via public DNS.
        if (!/querySrv|ECONNREFUSED|ETIMEOUT/.test(e.message)) throw e;
        dns.setServers(["8.8.8.8", "1.1.1.1"]);
        return connect(uri);
      });
    }
    return (await g._mongoPromise).db();
  } catch (e) {
    g._mongoPromise = null;
    console.error("[mongo] connection failed:", e.message);
    return null;
  }
}
