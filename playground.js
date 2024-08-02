const string = ["Ha", "yam"]
console.log(string.join("")) // Output: "Hayam"

const players = [
  { name: "John Doe", position: "Forward" },
  { name: "Jane Smith", position: "Goalkeeper" },
]

const playerCardsHTML = players
  .map(({ name, position }) => {
    return `
    <div class="player-card">
      <h2>${name}</h2>
      <p>Position: ${position}</p>
    </div>
  `
  })
  .join("")

console.log(playerCardsHTML)
