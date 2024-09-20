import { YoutubeTranscript } from "youtube-transcript";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateAnalysis(req, res) {
	try {
		const id = req.params.videoId;

		const t = await YoutubeTranscript.fetchTranscript(id);

		if (t.length <= 0) {
			return res.status(404).json({ msg: "Captions not found." });
		}

		const transcript = t.map((t) => t.text).join(" ");


		// return res.status(200).json(transcript);

		const AIverdict = await groq.chat.completions.create({
			messages: [
			  {
				role: "user",
				content: `Analyze the YouTube video transcript given and determine whether the content of the video is "Productive" or "Un-productive". Only return "1" for productive or "0" for un-productive as your answer. Transcript: "${transcript}"`,		//the prompt to the AI
			  },
			],
			model: "llama3-8b-8192",		//model used
		  });
		
		console.log(AIverdict.choices[0]?.message?.content || "");

		const verdict = AIverdict.choices[0]?.message?.content || "Could not analyze the video.";  //'verdict' contains either 1 for productive or 0 for un-productive when analysis is successful

		return res.status(200).json({
			// transcript: transcript,
			analysis: verdict,})

	} catch (err) {
		console.error(err);
		return res.status(500).json({ msg: "Unexpected error occured." });
	}
}