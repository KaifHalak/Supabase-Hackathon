import { supabase } from "../services/supabase.js";

export async function generateAnalysis(req, res) {
	try {
		const { data, error } = await supabase.from("Leaderboard").select();

		console.log("data");

		return data;
	} catch (err) {}
}
