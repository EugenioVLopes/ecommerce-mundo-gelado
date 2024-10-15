import { MongoClient } from "mongodb";

/**
 * Declaração global para a variável _mongoClientPromise.
 * @global
 * @var {Promise<MongoClient> | undefined} _mongoClientPromise - A promessa que representa a conexão com o cliente do MongoDB ou undefined se não estiver definida.
 */
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export {};
