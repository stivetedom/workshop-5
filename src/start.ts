import { launchNetwork } from ".";
import { startConsensus } from "./nodes/consensus";
import { Value } from "./types";
import { delay } from "./utils";

async function main() {
  // Modifier le tableau faultyArray selon les nœuds défectueux souhaités
  const faultyArray = [
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  // Modifier le tableau initialValues selon les valeurs initiales souhaitées
  const initialValues: Value[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  if (initialValues.length !== faultyArray.length)
    throw new Error("Lengths don't match");

  if (
    faultyArray.filter((faulty) => faulty === true).length >
    initialValues.length / 2
  )
    throw new Error("Too many faulty nodes");

  // Lancer le réseau avec les paramètres définis
  await launchNetwork(
    initialValues.length,
    faultyArray.filter((el) => el === true).length,
    initialValues,
    faultyArray
  );

  // Attendre un certain délai
  await delay(200);

  // Démarrer le consensus
  await startConsensus(initialValues.length);
}

main();
