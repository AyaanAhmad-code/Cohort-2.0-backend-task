import "dotenv/config";
import { ChatMistralAI } from "@langchain/mistralai";
import { createAgent } from "langchain";
import { listfiles, readfiles, updatefiles } from "./tool";

const model = new ChatMistralAI({
    model: "mistral-medium-latest",
    apiKey: process.env.MISTRAL_API_KEY,
    "temperature": 0.7,
});

const agent = createAgent({
    model,
    tools: [ listfiles, readfiles, updatefiles],
})

agent.invoke({
    messages: [
        {
            role: "user",
            content: "Update the theme of the project to use a dark color scheme. The theme is defined in the theme.css file in the styles directory. You can list the files in the project to find the exact path and read the contents of the theme.css file to understand how the theme is currently defined before making updates."
        }
    ]
})