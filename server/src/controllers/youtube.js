import { YoutubeTranscript } from "youtube-transcript";

export async function generateAnalysis(req, res) {
	try {
		const id = req.params.videoId;

		const t = await YoutubeTranscript.fetchTranscript(id);

		if (t.length <= 0) {
			return res.status(404).json({ msg: "Captions not found." });
		}

		const transcript = t.map((t) => t.text).join(" ");

		return res.status(200).json(transcript);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ msg: "Unexpected error occured." });
	}
}
