import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_KEY
});

export async function testAPi(){
    model.invoke("what i AI").then((response)=>{
        console.log(response.text)
    })
}