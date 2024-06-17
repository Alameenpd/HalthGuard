import prisma from "@/lib/prismaClient";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const myDocument = await prisma.myDocuments.findMany();
        res.status(200).json(myDocument);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "POST":
      try {
        const myDocument = await prisma.myDocuments.create({ data: req.body });
        console.log(myDocument);
        res.status(201).json(myDocument);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "PUT":
      try {
        const updatedTable = await prisma.myDocuments.update({
          where: { id: req.body.id },
          data: req.body,
        });
        res.status(200).json(updatedTable);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "DELETE":
      try {
        const deletedTable = await prisma.myDocuments.delete({
          where: { id: req.body.id },
        });
        res.status(200).json(deletedTable);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
