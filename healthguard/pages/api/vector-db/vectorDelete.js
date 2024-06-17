import { PineconeClient } from "@pinecone-database/pinecone";

export default async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  const { uploadId } = req.query;
  if (!uploadId) {
    return res.status(400).json({ message: "uploadId is required" });
  }

  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  });

  const index = client.Index(process.env.PINECONE_INDEX_NAME);

  try {
    // Delete the vector by metadata appId
    const result = await index._delete({
      deleteRequest: {
        filter: {
          uploadId: uploadId,
        },
        //namespace: your_name_space,
      },
    });

    return res.status(200).json({ message: "Vector deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
