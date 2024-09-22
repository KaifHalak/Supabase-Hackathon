const SERVER_URL = "http://localhost:3000"
const LEADERBOARD_DATA = SERVER_URL + "/leaderboard/data"

// const TOP_3_POSITIONS_BODY = document.querySelector()
const POST_3rd_POSITIONS_BODY = document.querySelector("#post-3-positions-body")

const POS_1_NAME = document.querySelector("#pos-1-name")
const POS_1_SCORE = document.querySelector("#pos-1-score")

let currentPositionCount = 1

function AddTop3Positions(name, points) {
     let nameElement = document.querySelector(
          `#pos-${currentPositionCount}-name`
     )
     let scoreElement = document.querySelector(
          `#pos-${currentPositionCount}-score`
     )

     nameElement.textContent = name
     scoreElement.textContent = points
}

function AddNewPost3rdPosition(name, points) {
     let element = document.createElement("tr")
     element.className = "border-b border-gray-700"

     element.innerHTML = `
     <td class="px-4 py-2">${currentPositionCount}</td>
     <td class="px-4 py-2">${name}</td>
     <td class="px-4 py-2 text-right">${points}</td>
    `

     POST_3rd_POSITIONS_BODY.appendChild(element)
}

async function FetchDataFromServer() {
     let result = await fetch(LEADERBOARD_DATA)
     const leaderboardData = await result.json()

     return leaderboardData
}

async function main() {
     // const { username, total_points: totalPoints, level } = await FetchDataFromServer()
     const leaderboardData = await FetchDataFromServer()

     leaderboardData.forEach(
          ({ username, total_points: totalPoints, level }) => {
               if (currentPositionCount <= 3) {
                    AddTop3Positions(username, totalPoints)
               } else {
                    AddNewPost3rdPosition(username, totalPoints)
               }

               currentPositionCount++
          }
     )
}

main()
