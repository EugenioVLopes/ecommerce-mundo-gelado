// lib/dbConnect.ts

import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGO_URL;

if (!MONGODB_URL) {
  throw new Error('Por favor, defina a variável de ambiente MONGODB_URL');
}

interface Cached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: Cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    };

    mongoose.set('strictQuery', false);
    cached.promise = mongoose.connect(MONGODB_URL ?? '', opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;