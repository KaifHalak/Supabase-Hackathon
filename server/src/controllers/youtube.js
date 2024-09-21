import { YoutubeTranscript } from "youtube-transcript";
// import Groq from "groq-sdk";
import { supabase } from "../services/supabase.js";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateAnalysis(req, res) {
	try {
		const id = req.params.videoId;

		const t = await YoutubeTranscript.fetchTranscript(id);

		if (t.length <= 0) {
			return res.status(404).json({ msg: "Captions not found." });
		}

		let transcript;

		if (t[t.length - 1].offset > 600) {
			let time = 0;
			let index;

			for (let i = 0; i < t.length; i++) {
				if (time >= 600) break;
				index = i;
				if (t[i].offset > time) {
					time = t[i].offset;
				}
			}
			transcript = t
				.slice(0, index)
				.map((t) => t.text)
				.join(" ");
		} else {
			transcript = t.map((t) => t.text).join(" ");
		}

		// return res.status(200).json({ t: t.slice(0, 270).slice(-1), transcript });

		const AIverdict = await groq.chat.completions.create({
			messages: [
				{
					role: "user",
					content: `Analyze the YouTube video transcript given and determine whether the content of the video is "Productive" or "Un-productive". Only return "1" for productive or "0" for un-productive as your answer. Transcript: "${transcript}"`, //the prompt to the AI
				},
			],
			model: "llama3-8b-8192", //model used
		});

		console.log(AIverdict.choices[0]?.message?.content || "");

		const verdict = AIverdict.choices[0]?.message?.content || "Could not analyze the video."; //'verdict' contains either 1 for productive or 0 for un-productive when analysis is successful

		const insertIntoVideos = await supabase.from("Videos").insert([{ uri: id, ai_productivity_analysis: verdict, user }]);

		return res.status(200).json({
			// transcript: transcript,
			analysis: verdict,
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ msg: "Unexpected error occured." });
	}
}
