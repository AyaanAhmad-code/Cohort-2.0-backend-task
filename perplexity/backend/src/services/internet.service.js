import "dotenv/config"
import { tavily } from "@tavily/core"

const tvly = tavily({ apiKey: process.env.TVLY_API_KEY });

export async function searchInternet({ query }) {
    try {
        const response = await tvly.search(query, {
            searchDepth: "basic",
            maxResults: 1
        });
        if (!response.results || response.results.length === 0) {
            return "Search completed but no relevant information was found on the internet.";
        }
        return JSON.stringify(response)

    } catch (error) {
        console.error("Tavily Search Error:", error.message);
        return "Search currently unavailable due to technical issues. Please answer based on your existing knowledge or inform the user about the service downtime.";
    }
}