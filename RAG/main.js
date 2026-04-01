import { PDFParse } from "pdf-parse";
import fs from "fs";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import dotenv from "dotenv";
dotenv.config();
import { Pinecone } from '@pinecone-database/pinecone'

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.index("cohort-2-rag")

let dataBuffer = fs.readFileSync('')

const parser = new PDFParse({
    data: dataBuffer
})

const data = await parser.getText()

const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed"
})

const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 0 })

const texts = splitter.splitText(data.text)

const docs = await Promise.all(chunks.map(async (texts) =>{
    const embedding = await embeddings.embedQuerry(texts)
    return {
        text: texts,
        embedding
    }
}))

const result = await index.upsert({
    records: docs.map((doc, i) =>({
        id: `doc-${i}`,
        values: doc.embedding,
        metadata: {
            text: doc.text
        }
    }))
})

const queryEmbedding = await embeddings.embedQuery("how was the internship experience?")

const result1 = await index.query({
    vector: queryEmbedding,
    topK: 2,
    includeMetadata: true
})