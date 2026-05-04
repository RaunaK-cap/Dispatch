import express from "express"
import { createClient } from "redis"
import dotenv from "dotenv"

dotenv.config()


const client = createClient().on("error", (err) =>
    console.log("Redis Client Error", err),
);
await client.connect();


