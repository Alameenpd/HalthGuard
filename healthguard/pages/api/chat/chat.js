import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { AIMessage, HumanMessage } from "langchain/schema";
import { makeChain } from "../../../lib/makeChain";

//const PINECONE_NAME_SPACE = "your_namespace"; // Replace with your namespace

export default async (req, res) => {
  const { question, history, appId } = req.body;

  if (!question) {
    return res.status(400).json({ message: "Question is required" });
  }

  const sanitizedQuestion = question.trim().replaceAll("\n", " ");

  try {
    const pineconeClient = new PineconeClient();
    await pineconeClient.init({
      environment: process.env.PINECONE_ENVIRONMENT,
      apiKey: process.env.PINECONE_API_KEY,
    });

    const index = pineconeClient.Index(process.env.PINECONE_INDEX_NAME);

    /* create vectorstore */
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({}),
      {
        pineconeIndex: index,
        textKey: "text",
        //namespace: your_name_space,
      }
    );

    // create chain
    const chain = makeChain(vectorStore);

    const pastMessages = history.map((message, i) => {
      if (i % 2 === 0) {
        return new HumanMessage(message);
      } else {
        return new AIMessage(message);
      }
    });

    // Ask a question using chat history
    const response = await chain.call({
      question: sanitizedQuestion,
      chat_history: pastMessages,
    });

    res.status(200).json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message || "Something went wrong" });
  }
};
