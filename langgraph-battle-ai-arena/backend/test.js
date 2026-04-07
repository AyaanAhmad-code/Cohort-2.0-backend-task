import { AIMessage } from "@langchain/core/messages";

const msg = new AIMessage("Hello world");
console.log(msg.text); // what is it?
console.log(msg.content);
