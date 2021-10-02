//------------------------ from function  ----------------------
function Topnav_And_Form() {
  //navbar
  const nav = document.createElement("nav");
  const section = document.createElement("section");

  const formdiv = document.createElement("div");
  formdiv.setAttribute("class", "conatiner");
  formdiv.innerHTML = `
     <form>
        <input type="text" name="search" id="search" placeholder="enter anime name">
        <button type="button" onclick="searchAnime(event)">search</button>
     </form>`;
  section.append(formdiv);
  document.querySelector(".form").append(nav, section);
}
Topnav_And_Form();

//------------------------ searching Anime name in the search box ----------------------
function searchAnime(event) {
  event.preventDefault();
  let inputtext = document.getElementById("search");
  let tobefindtext = inputtext.value;

  if (tobefindtext == "") {
    window.alert("Please!!! Enter the name to find Anime 😀");
  } else {
    getAnime(tobefindtext);
  }
}

var inputtext = document.getElementById("search");
inputtext.addEventListener("keypress", function (e) {
  if (e.key === "Enter") searchAnime(event);
});
//-------------------------- setting  initial API to be loaded ---------------------------
async function getAnime(find) {
  try {
    const data = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${find}&page=1`
    );
    const initial_datas = await data.json();
    console.log(initial_datas);
    document.querySelector(".image-conatiner").innerHTML = "";
    displayAnime(initial_datas.results);
  } catch (err) {
    document
      .querySelector(".image-conatiner")
      .append("Details Cannot be  Found.");
  }
}

//-------------------------- displayAnime  ---------------------------
function displayAnime(animes) {
  animes.forEach((anime) => {
    var image_box = document.createElement("div");
    image_box.innerHTML = `
<div class="card">
        <div class="image">
          <img src=${anime.image_url} alt="image">
        </div>
        <div class="content">
          <h2><strong>Titile:</strong> ${anime.title}</h2>
          <p><strong>Start Date:</strong>    ${new Date(
            anime.start_date
          ).toDateString()}</p>
          <p><strong>End Date:</strong>      ${new Date(
            anime.end_date
          ).toDateString()}</p>
          <p><strong>Type of series:</strong>          ${anime.type}</p>    
          <p><strong>IMDB Rating:</strong> ${anime.score}</p> 
        </div>
</div>`;
    document.querySelector(".image-conatiner").append(image_box);
  });
}
