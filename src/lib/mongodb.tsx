import { MongoClient } from 'mongodb'

// Verifica se a variável de ambiente MONGO_URL está definida
if (!process.env.MONGO_URL) {
  throw new Error('Variável de ambiente inválida ou ausente: "MONGO_URL"')
}

// URL de conexão com o MongoDB
const url = process.env.MONGO_URL
// Opções de conexão (podem ser configuradas conforme necessário)
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // No modo de desenvolvimento, usamos uma variável global
  // para preservar o valor entre recarregamentos de módulos causados por HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(url, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // No modo de produção, é melhor não usar uma variável global.
  client = new MongoClient(url, options)
  clientPromise = client.connect()
}

// Exportamos uma promessa de MongoClient com escopo de módulo.
// Fazendo isso em um módulo separado, o cliente pode ser compartilhado entre funções.
export default clientPromise

// Função para conectar ao banco de dados
export async function connectToDatabase() {
  // Aguarda a resolução da promessa do cliente
  const client = await clientPromise
  // Obtém a referência ao banco de dados
  const db = client.db()
  // Retorna o cliente e a referência ao banco de dados
  return { client, db }
}