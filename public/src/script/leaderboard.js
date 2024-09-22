const SERVER_URL = "http://localhost:3000"
const LEADERBOARD_DATA = SERVER_URL + "/leaderboard/data"

// const TOP_3_POSITIONS_BODY = document.querySelector()
const POST_3rd_POSITIONS_BODY = document.querySelector("#post-3-positions-body")
const CURRENT_USER_BODY = document.querySelector("#current-user-body")
const LOADER = document.querySelector("#loader-container")

let currentPositionCount = 1

function AddTop3Positions(name, points, currentUser) {
     let nameElement = document.querySelector(
          `#pos-${currentPositionCount}-name`
     )
     let scoreElement = document.querySelector(
          `#pos-${currentPositionCount}-score`
     )

     nameElement.textContent = `${name} ${currentUser ? "(You)" : ""}`
     scoreElement.textContent = points
}

function AddNewPost3rdPosition(name, points, currentUser) {
     let element = document.createElement("tr")
     element.className = `border-b border-gray-700 ${
          currentUser ? "bg-[#444761]" : ""
     }`

     element.innerHTML = `
     <td class="px-4 py-2">${currentPositionCount}</td>
     <td class="px-4 py-2">${name} ${currentUser ? "(You)" : ""}</td>
     <td class="px-4 py-2 text-right">${points}</td>
    `

     POST_3rd_POSITIONS_BODY.appendChild(element)
}

function AddCurrentUserOnTop(name, points, currentUser){
     let element = document.createElement("tr")
     element.className = `w-full border-b border-gray-700 bg-[#444761]`

     element.innerHTML = `
     <td class="px-4 py-2">${currentPositionCount}</td>
     <td class="px-4 py-2">${name} (You)</td>
     <td class="px-4 py-2 text-right">${points}</td>
    `

    CURRENT_USER_BODY.appendChild(element)
}

async function FetchDataFromServer() {
     let result = await fetch(LEADERBOARD_DATA)
     const leaderboardData = await result.json()

     return leaderboardData
}

async function main() {
     const leaderboardData = await FetchDataFromServer()

     leaderboardData.forEach(
          ({ username, total_points: totalPoints, level, currentUser }) => {
               if (currentUser && currentPositionCount > 10) {
                    AddCurrentUserOnTop(username, totalPoints)
               }

               if (currentPositionCount <= 3) {
                    AddTop3Positions(username, totalPoints, currentUser)
               } else {
                    AddNewPost3rdPosition(username, totalPoints, currentUser)
               }

               currentPositionCount++
          }
     )

     LOADER.classList.add("hidden")

}

main()
