const SERVER_URL = "http://localhost:3000"
const LEADERBOARD_DATA = SERVER_URL + "/leaderboard/data"

// const TOP_3_POSITIONS_BODY = document.querySelector()
const POST_3rd_POSITIONS_BODY = document.querySelector("#post-3-positions-body")
const CURRENT_USER_BODY = document.querySelector("#current-user-body")
const LOADER = document.querySelector("#loader-container")

let currentPositionCount = 1

function AddTop3Positions(name, points, level, currentUser) {
     let nameElement = document.querySelector(
          `#pos-${currentPositionCount}-name`
     )
     let scoreElement = document.querySelector(
          `#pos-${currentPositionCount}-score`
     )

     let levelElement = document.querySelector(
          `#pos-${currentPositionCount}-level`
     )

     nameElement.textContent = `${name} ${currentUser ? "(You)" : ""}`
     scoreElement.textContent = `${points} points`
     levelElement.textContent = `Level ${level}`
}

function AddNewPost3rdPosition(name, points, level, currentUser) {
     let element = document.createElement("tr")
     element.className = `border-b border-gray-700 ${
          currentUser ? "bg-[#444761]" : ""
     }`

     element.innerHTML = `
     <td class="px-4 py-2">${currentPositionCount}</td>
     <td class="px-4 py-2">${name} ${currentUser ? "(You)" : ""}</td>
     <td class="px-4 py-2 text-right">${points}</td>
     <td class="px-4 py-2 text-right">${level}</td>
    `

     POST_3rd_POSITIONS_BODY.appendChild(element)
}

function AddCurrentUserOnTop(name, points) {
     let element = document.createElement("tr")
     element.className = `w-full border-b border-gray-700 bg-[#444761]`

     element.innerHTML = `
     <td class="px-4 py-2">${currentPositionCount}</td>
     <td class="px-4 py-2">${name} (You)</td>
     <td class="px-4 py-2 text-right">${points}</td>
     <td class="px-4 py-2 text-right">${level}</td>
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
     LOADER.classList.add("hidden")

     leaderboardData.forEach(
          ({ username, total_points: totalPoints, level, currentUser }) => {
               if (currentUser && currentPositionCount > 10) {
                    AddCurrentUserOnTop(username, totalPoints, level)
               }

               if (currentPositionCount <= 3) {
                    AddTop3Positions(username, totalPoints, level, currentUser)
               } else {
                    AddNewPost3rdPosition(
                         username,
                         totalPoints,
                         level,
                         currentUser
                    )
               }

               currentPositionCount++
          }
     )
}

main()
