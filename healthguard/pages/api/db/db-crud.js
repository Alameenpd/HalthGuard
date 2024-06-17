import prisma from "@/lib/prismaClient";

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const myTables = await prisma.myTable.findMany();
        res.status(200).json(myTables);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "POST":
      try {
        const newTable = await prisma.myTable.create({ data: req.body });
        res.status(201).json(newTable);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "PUT":
      try {
        const updatedTable = await prisma.myTable.update({
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
        const deletedTable = await prisma.myTable.delete({
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
