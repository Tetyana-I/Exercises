async function searchShows(query) {
  const res = await axios.get('http://api.tvmaze.com/search/shows', {params: {q: query}});
  const shows = [];
  let imageUrl;
  for (let i=0; i<res.data.length; i++) {
    if (res.data[i].show.image === null) imageUrl = 'https://tinyurl.com/tv-missing';
      else imageUrl = res.data[i].show.image.original;
    shows[i] = {
      id: res.data[i].show.id,
      name: res.data[i].show.name,
      summary: res.data[i].show.summary,
      image: imageUrl
    };
  }
  return shows;
}

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let i = 0; i < shows.length; i++) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${shows[i].id}">
         <div class="card" data-show-id="${shows[i].id}">
          <img class="card-img-top img-fluid" src="${shows[i].image}"></img>
           <div class="card-body">
             <h5 class="card-title">${shows[i].name}</h5>
             <p class="card-text">${shows[i].summary}</p>
             <button class="btn btn-primary">Episodes</button>
           </div>
         </div>
       </div>
      `);
    
    $showsList.append($item);

   
  }
}

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});



/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above


async function getEpisodes(id) {
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  const episodes = [];
  for (let i=0; i<res.data.length; i++) {
    const episode = {
      id: res.data[i].id,
      name: res.data[i].name,
      season: res.data[i].season,
      number: res.data[i].number
    };
    episodes[i] = episode;
  }
  return episodes;
}

function populateEpisodes(episodes) {
    const $episodesList = $("#episodes-list");
    $episodesList.empty();
    for (let i = 0; i < episodes.length; i++) {
      let $episode = $(`<li>${episodes[i].name} (season ${episodes[i].season}, number ${episodes[i].number})</li>`);
      console.log("episod", $episode);
      $episodesList.append($episode);
    }
    $("#episodes-area").attr('style', 'display: list-item');
}


// handleEpisodes function handle clicks on "Episodes" buttons

$("#shows-list").on("click", async function handleEpisodes(evt) {
  
  let showID;
  if (evt.target.innerText === "Episodes") {
    showID=$(evt.target).parent().parent().attr('data-show-id'); // get show ID from div#card attribute
  } else return;

  let episodes = await getEpisodes(showID); //pass in show ID to get array of episodes

  populateEpisodes(episodes); // pass in an array of epusodes to create HTML episodes list
});