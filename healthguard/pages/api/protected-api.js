import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });

  if (session) {
    // The user is authenticated, proceed with your API route handler
    res.status(200).json({ message: "Protected data" });
  } else {
    // The user is not authenticated, respond with a 401 status code
    res.status(401).json({ message: "Unauthorized" });
  }
};
