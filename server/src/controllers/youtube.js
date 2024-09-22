import { YoutubeTranscript } from "youtube-transcript"
import Groq from "groq-sdk"
import { supabase } from "../services/supabase.js"

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const POINTS_PER_VID = 70

export async function generateAnalysis(req, res) {
     try {
          const id = req.params.videoId

          console.log("Youtube id: ", id)

          const { data } = await supabase
               .from("Users")
               .select()
               .eq("email", req.user.email)
               .eq("username", req.user.name)

          const user = data[0]

          const t = await YoutubeTranscript.fetchTranscript(id)

          const videoWatchedByThisUser = await supabase
               .from("User-Video")
               .select()
               .eq("userId", user.userId)
               .eq("uri", id)

          if (videoWatchedByThisUser.data.length > 0) {
               // No need to do anything
               console.log("Video already watched by this user")
               return res.status(
                    200
               ) /* .json({ analysis: videoExists.data[0].analysis });*/
          }

          const videoAnalysisExistsInDB = await supabase
               .from("Videos")
               .select()
               .eq("uri", id)

          if (videoAnalysisExistsInDB.data.length > 0) {
               console.log("Video exists in DB. no need for re-analysis")

               let pointsEarned = 0

               const analysis = videoAnalysisExistsInDB.data[0].analysis
               const uri = videoAnalysisExistsInDB.data[0].uri

               let gainPointsFlag = false
               if (analysis === "productive") {
                    gainPointsFlag = true
                    pointsEarned = POINTS_PER_VID
               }

               await UpdateUserStats(user, t, gainPointsFlag)

               const insertNewVideoWatchedByUser = await supabase
                    .from("User-Video")
                    .insert({
                         userId: user.userId,
                         uri
                    })
                    .select()

               console.log("New vid watched by user")
               console.log(insertNewVideoWatchedByUser)

               return res.json({ pointsEarned })
          }

          // Perform video analysis as it does not exist in DB

          // Ignore the vid if no captions
          if (t.length <= 0) {
               return res.status(404)
          }

          // Make use of only first 10 min of transcript
          let transcript

          if (t[t.length - 1].offset > 600) {
               let time = 0
               let index

               for (let i = 0; i < t.length; i++) {
                    if (time >= 600) break
                    index = i
                    if (t[i].offset > time) {
                         time = t[i].offset
                    }
               }
               transcript = t
                    .slice(0, index)
                    .map((t) => t.text)
                    .join(" ")
          } else {
               transcript = t.map((t) => t.text).join(" ")
          }

          let verdict
          let numOfAttempts = 3
          let currentAttempt = 0
          let correctVerdictFlag = false
          while (!correctVerdictFlag && currentAttempt <= numOfAttempts) {
               const AIverdict = await groq.chat.completions.create({
                    messages: [
                         {
                              role: "user",
                              content: `Analyze the YouTube video transcript given and determine whether the content of the video is "Productive" or "Un-productive". Only return "1" for productive or "0" for un-productive as your answer. Do not reply with anything else. Transcript: "${transcript}"` //the prompt to the AI
                         }
                    ],
                    model: "llama3-8b-8192" //model used
               })

               //   console.log(AIverdict.choices[0]?.message?.content || "")

               verdict = AIverdict.choices[0]?.message?.content || undefined //'verdict' contains either 1 for productive or 0 for un-productive when analysis is successful

               console.log("AI verdict: ")
               console.log(verdict)
               console.log("attempt: ", currentAttempt)

               if (verdict == 1 || verdict == 0) {
                    correctVerdictFlag = true
               }

               currentAttempt++
          }

          if (!correctVerdictFlag) {
               return res.status(500)
          }

          if (verdict == 1) {
               console.log("verdict == 1")
               await UpdateUserStats(user, t, true)
          }

          const insertNewVideoAnalysis = await supabase
               .from("Videos")
               .insert({
                    uri: id,
                    analysis: verdict == 1 ? "productive" : "unproductive"
               })
               .select()

          const videoURI = insertNewVideoAnalysis.data[0].uri

          const insertNewVideoWatchedByUser = await supabase
               .from("User-Video")
               .insert({
                    userId: user.userId,
                    uri: videoURI
               })
               .select()

          console.log("Insert into vid")
          console.log(insertNewVideoAnalysis)

          console.log("New video watched by user")
          console.log(insertNewVideoWatchedByUser)

          if (
               insertNewVideoAnalysis.data?.length > 0 &&
               !insertNewVideoAnalysis.error
          ) {
               let pointsEarned = 0

               if (verdict == 1) {
                    pointsEarned = POINTS_PER_VID
               }

               return res.status(200).json({
                    pointsEarned
               })
          } else return res.status(500)
     } catch (err) {
          console.error(err)
          return res.status(500)
     }
}

async function UpdateUserStats(user, t, gainPointsFlag) {
     let level = user.level
     let total_points

     if (gainPointsFlag) {
          total_points = user.total_points += POINTS_PER_VID
     } else {
          total_points = user.total_points += 0
     }

     const total_videos_watched = user.total_videos_watched + 1
     const total_hours_spent =
          user.total_hours_spent + t[t.length - 1].offset / 3600
     const nextLevel = 100 * Math.pow(1.3, user.level)

     if (total_points > nextLevel) level = user.level + 1

     const updateUserStats = await supabase
          .from("Users")
          .update({
               total_points,
               total_videos_watched,
               total_hours_spent,
               level
          })
          .eq("userId", user.userId)
}
