const allTeams = () => {
  spinner("block");
  const searchValue = document.getElementById("search-box").value;
  console.log(searchValue);
  const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => showTeams(data.player));
  document.getElementById("search-box").value = "";
  spinner("none");
};

const showTeams = (teams) => {
  for (const player of teams) {
    // console.log(team);
    const parent = document.getElementById("team-container");
    let card = document.createElement("div");
    card.classList.add("col-md-12");
    card.innerHTML = `
    <div class="card p-5 bordered border mt-2">
    <div class="img rounded">
      <img
        class="w-25"
        src="${player.strThumb}"
        alt="picture"
      />
    </div>
    <h4 class="title"></h4>
    <p class="description">
    ${player.strDescriptionEN.slice(0, 100)}</p>
    <div class="button-container">
      <button  class="delete-btn btn btn-danger">Delete</button>
      <button onclick="teamDetails('${
        player.idPlayer
      }')" class="details-btn btn btn-success">Details</button>
    </div>
  </div>
      `;
    parent.appendChild(card);
    const allDetailsBtn = document.getElementsByClassName("delete-btn");
    console.log(allDetailsBtn);
    for (const button of allDetailsBtn) {
      button.addEventListener("click", (e) => {
        console.log("hello");
        e.target.parentNode.parentNode.style.display = "none";
      });
    }
  }
};

const teamDetails = (teamId) => {
  console.log(teamId);
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${teamId}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => shoePlayerDetails(data.players[0]));
};

const shoePlayerDetails = (info) => {
  console.log(info);

  if (info.strGender == "Male") {
    document.getElementById("female-img").style.display = "none";
    document.getElementById("male-img").style.display = "block";
    console.log(info.strGender);
  } else {
    document.getElementById("female-img").style.display = "block";
    document.getElementById("male-img").style.display = "none";
    console.log(info.strGender);
  }

  document.getElementById(
    "team-details-container"
  ).innerHTML = `<div class="player-details">
    <div class="profile-pic w-50 m-auto rounded">
        <img class="w-50" src="${info.strThumb}" alt="">
    </div>
    <h1>Name: ${info.strPlayer}</h1>
    <h3>Country:${info.strNationality} </h3>
    <h4>Gender: ${info.strGender}</h4>
    <p>${info.strDescriptionEN.slice(0, 200)}</p>
</div>`;
};

const spinner = (condition) => {
  document.getElementById("spinner").style.display = condition;
};
