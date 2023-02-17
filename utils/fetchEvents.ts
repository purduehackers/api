import { client } from "../db/events";

export async function fetchEvents(groq?: string): Promise<any> {
  return await client.fetch(groq).catch((err) => {
    console.log(`error fetching:`, err, `\n groq query: ${groq}`);
  });
}
