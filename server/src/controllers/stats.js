import { supabase } from "../services/supabase.js";
export async function getUserStats(req, res) {
	try {
		const { userId } = req.user || { userId: 1 };

		const { data: user, error: uError } = await supabase.from("Users").select("*").eq("userId", userId);

		if (uError) {
			console.error("Error fetching users:", uError);
			throw uError;
		}

		let { data: leaderboard, error: lError } = await supabase
			.from("Users")
			.select("userId, total_points")
			.order("total_points", { ascending: false });

		if (lError) {
			console.error("Error fetching users:", lError);
			throw lError;
		}

		const userRank = leaderboard.findIndex((user) => user.userId === userId) + 1;

		console.log(`User with ID ${userId} is in position ${userRank + 1}`);

		const currentPoints = user.total_points;
		const nextLevel = user.level + 1;

		const pointsToLevelUp = 100 * Math.pow(1.3, nextLevel);

		const pointsToAdvance = pointsToLevelUp - currentPoints;

		return res.status(200).json({
			dailyGoal: 100,
			leaderboardPosition: userRank,
			points: currentPoints,
			currentLevel: user.level,
			pointsToAdvance,
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ msg: "Unexpected error occured." });
	}
}
