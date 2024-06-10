/* eslint-disable @typescript-eslint/no-var-requires */
const gTTS = require("gtts");
import type { NextApiRequest, NextApiResponse } from "next";
import streamifier from "streamifier";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // const { text } = req.body;
    const gttsInstance = new gTTS("HI", "en");

    try {
      const data = await gttsInstance.stream();
      const stream = streamifier.createReadStream(data);
      res.setHeader("Content-Type", "audio/mp3");
      res.setHeader("Content-Length", data.length.toString());
      stream.pipe(res);
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
