const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: process.NODE_ENV === "production",
});

export const previewClient = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token:
    "skmYgAGtjCuL3bUg9SMtrrfyxPOeTDCbz9H4cQG4oDA1ASYhxtGQVPzcNRcAtFAEVSe6cTrgK6UxVr0wAz4tjCesR1mvMicxC8XjYZdUFtViE30yx7s9V8LQiX1un2WvMacPCNfMZ1805H3QeiUY6XbsBpQeOrz0BNsmOZ8IGOkIEWSRdNv4",
});

export default client;
