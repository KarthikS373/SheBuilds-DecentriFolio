import type { NextApiRequest, NextApiResponse } from "next"

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: "Welcome" })
}

export default handler
