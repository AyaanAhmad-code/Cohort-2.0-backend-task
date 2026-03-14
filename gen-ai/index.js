import "dotenv/config"
import readline from "readline/promises"
import { ChatMistralAI } from "@langchain/mistralai";
import { createAgent, HumanMessage, tool } from "langchain";
import { sendEmail } from "./mail.service.js";
import * as z from "zod"
import { searchInternet } from "./search.service.js";


const emailTool = tool(
    sendEmail,
    {
        name: "emailTool",
        description: "use this tool to send an email",
        schema: z.object({
            to: z.string().describe("The recipent's email address"),
            html: z.string().describe("The HTML content of the email"),
            subject: z.string().describe("The subject of the email")
        })
    }
)

const searchTool = tool(
    searchInternet,
    {
        name: "searchTool",
        description: "Use this tool to fetch real-time information from the internet about current events, news, or facts not in your training data.",
        schema: z.object({
            query: z.string().describe("The specific search terms or question to look up on the internet.")
        })
    }
)

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const model = new ChatMistralAI({
    model: "mistral-small-latest"
})

const agent = createAgent({
    model,
    tools: [ emailTool, searchTool ],
    systemMessage: "You are a helpful assistant with access to the internet and email. Always use the search tool for current events. If the user asks to send an email, confirm the details first."
})

const messages = []

while(true){

    const userInput = await rl.question("\x1b[32mYou:\x1b[0m")

    messages.push(new HumanMessage(userInput))

    const response = await agent.invoke({messages})

    messages.push(response.messages[response.messages.length -1])

    const finalContent = response.messages[response.messages.length - 1].content;
    console.log(`\n\x1b[34mAI:\x1b[0m ${finalContent}\n`);

}

rl.close();