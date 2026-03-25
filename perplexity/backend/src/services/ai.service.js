import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage, AIMessage, tool, createAgent } from "langchain"
import { ChatMistralAI } from "@langchain/mistralai";
import * as z from "zod"
import { searchInternet } from "./internet.service.js";

const searchInternetTool = tool(
    searchInternet,
    {
        name: "searchInternet",
        description: "Use this tool to fetch real-time information from the internet about current events, news, or facts not in your training data.",
        schema: z.object({
            query: z.string().describe("The specific search terms or question to look up on the internet.")
        })
    }
)

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
})

const agent = createAgent({
    model: mistralModel,
    tools: [ searchInternetTool]
})

export async function generateResponse(messages){
    
    const response = await agent.invoke({
        messages: [
            new SystemMessage(`
                You are a helpful and precise assistant for answering questions.
                If you don't know the answer, say you don't know. 
                If the question requires up-to-date information, use the "searchInternet" tool to get the latest information from the internet and then answer based on the search results.
            `),
            ...(messages.map(msg => {
                if (msg.role == "user") {
                    return new HumanMessage(msg.content)
                } else if (msg.role == "ai") {
                    return new AIMessage(msg.content)
                }
            })) ]
    });


    return response.messages[ response.messages.length - 1 ].text
}

export async function generateChatTitle(message){
    const response = await mistralModel.invoke([
        new SystemMessage(`You are a helpful assistant that generates concise and descriptive titles for chat 
            conversation.
            
        User will provide you with the first message pf a chat conversation, and you will generate a title that
        captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging, 
        giving users a quick understanding of the chat's topic.
            `),
        new HumanMessage(` Generate a title for a chat conversation based on the following first message: "${message}"`)
    ])

    return response.text
}