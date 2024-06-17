import multer from "multer";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { Document } from "langchain/document";
import fs from "fs";

const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  upload.single("pdfFile")(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const pdfFilePath = req.file.path;
    const indexName = process.env.PINECONE_INDEX_NAME;
    const pineconeClient = new PineconeClient();
    await pineconeClient.init({
      environment: process.env.PINECONE_ENVIRONMENT,
      apiKey: process.env.PINECONE_API_KEY,
    });

    const { appId, uploadId, filename } = req.body;

    try {
      // Load the document
      const loader = new PDFLoader(pdfFilePath);
      const docs = await loader.load();

      // Split the text into chunks for embedding and vector storage
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 0,
      });
      const splitResult = await textSplitter.splitDocuments(docs);

      const embeddings = new OpenAIEmbeddings();
      const index = pineconeClient.Index(indexName);

      const documents = splitResult.map((doc) => {
        return new Document({
          metadata: {
            ...doc.metadata,
            appId: appId,
            uploadId: uploadId,
            filename: filename,
          },
          pageContent: doc.pageContent,
        });
      });

      //embed the PDF documents
      await PineconeStore.fromDocuments(documents, embeddings, {
        pineconeIndex: index,
        //namespace: your_name_space,
        textKey: "text",
      });

      // Delete the file from the /uploads folder
      fs.unlink(pdfFilePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });

      res.status(200).json({ message: "PDF file processed successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  });
};
