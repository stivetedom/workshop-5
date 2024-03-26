import bodyParser from "body-parser";
import express from "express";
import { BASE_NODE_PORT } from "../config";
import { Value } from "../types";

export async function node(
  nodeId: number, // the ID of the node
  N: number, // total number of nodes in the network
  F: number, // number of faulty nodes in the network
  initialValue: Value, // initial value of the node
  isFaulty: boolean, // true if the node is faulty, false otherwise
  nodesAreReady: () => boolean, // used to know if all nodes are ready to receive requests
  setNodeIsReady: (index: number) => void // this should be called when the node is started and ready to receive requests
) {
  const node = express();
  node.use(express.json());
  node.use(bodyParser.json());

  // Route pour récupérer l'état actuel du nœud
  node.get("/status", (req, res) => {
    if (isFaulty) {
      res.status(500).send("faulty");
    } else {
      res.status(200).send("live");
    }
  });

  // Route pour recevoir des messages d'autres nœuds
  node.post("/message", (req, res) => {
    // Logique pour traiter le message reçu
    // Par exemple, vous pouvez traiter le message et envoyer une réponse appropriée
    res.send("Message received successfully");
  });

  // Route pour démarrer l'algorithme de consensus
  node.get("/start", async (req, res) => {
    // Logique pour démarrer l'algorithme de consensus
    // Par exemple, vous pouvez appeler une fonction qui initialise le consensus
    res.send("Consensus algorithm started");
  });

  // Route pour arrêter l'algorithme de consensus
  node.get("/stop", async (req, res) => {
    // Logique pour arrêter l'algorithme de consensus
    // Par exemple, vous pouvez appeler une fonction qui arrête le consensus en cours
    res.send("Consensus algorithm stopped");
  });

  // Route pour obtenir l'état actuel du nœud
  node.get("/getState", (req, res) => {
    // Logique pour obtenir l'état actuel du nœud
    // Par exemple, vous pouvez renvoyer un objet contenant l'état actuel du nœud
    res.send("Current state of the node");
  });

  // start the server
  const server = node.listen(BASE_NODE_PORT + nodeId, async () => {
    console.log(
      `Node ${nodeId} is listening on port ${BASE_NODE_PORT + nodeId}`
    );

    // the node is ready
    setNodeIsReady(nodeId);
  });

  return server;
}
