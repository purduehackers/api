// import Airtable from 'airtable';

// Airtable.configure({
//   apiKey: process.env.AIRTABLE_API_KEY,
// });

// const eventBase = Airtable.base(process.env.EVENTS_BASE_ID || "");
// const eventTable = eventBase(process.env.EVENTS_TABLE_NAME || "");

// export { eventTable, eventBase };

import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-02-16",
  token: process.env.SANITY_TOKEN,
});
