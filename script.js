const doSearch= (search) =>{
  const newSearch = search.split(' ').join('_')
  fetch(`https://www.omdbapi.com/?s=${newSearch}&apikey=3cb5500d`)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    if (response.Response == "True"){
      views(response.Search)
    }else{
      console.log("morchepo")
    }})
  .catch((error) => {
    console.error('Response error:', error.message);
  });
}

const resultMovie = () =>{
  const search = document.querySelector('#action-search')
  doSearch(search.value)
  return false
}

const views = (allmovies) => {
  const container = document.querySelector('#container');
  container.innerHTML = '';
  allmovies.forEach(movie => {
    container.innerHTML+= cardTemplate(movie);
  });
}

const loadModal = (id) =>{
  fetch(`https://www.omdbapi.com/?i=${id}&apikey=3cb5500d`)
  .then((response) => {
    return response.json();
  })
  .then((response) => {
    console.log(response)
    if (response.Response == "True"){
      createModal(response)
    }else{
      console.log("morchepo")
    }})
  .catch((error) => {
    console.error('Response error:', error.message);
  });
}

const createModal = (movie) => {
  const container = document.querySelector('#modalContainer');
  container.innerHTML = '';
  container.innerHTML+= modalTemplate(movie);
}

const deleteMovie = () => {
  const container = document.querySelector('#modalContainer');
  container.innerHTML = '';
}

const cardTemplate = (movie) => (

  `
  <!-- Card 1 -->
  <div class="col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-sm border border-slate-200 overflow-hidden">
    <div class="flex flex-col h-full">
      <!-- Image -->
      <img class="w-full aspect-square object-cover" src="${movie.Poster != "N/A" ? movie.Poster : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}" alt="affiche du movie ${movie.Title}">
      <!-- Card Content -->
      <div class="grow flex flex-col p-5">
        <!-- Card body -->
        <div class="grow">
          <!-- Header -->
          <header class="mb-3">
              <h3 class="text-lg text-slate-800 font-semibold">${movie.Title}</h3>
          </header>
          <!-- Features list -->
          <ul class="text-sm space-y-2 mb-3 text-slate-800">
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar shrink-0 mr-3" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <rect x="4" y="5" width="16" height="16" rx="2" />
                <line x1="16" y1="3" x2="16" y2="7" />
                <line x1="8" y1="3" x2="8" y2="7" />
                <line x1="4" y1="11" x2="20" y2="11" />
                <line x1="11" y1="15" x2="12" y2="15" />
                <line x1="12" y1="15" x2="12" y2="18" />
                </svg>
                <p>${movie.Year}</p>
              </li>
          </ul>
        </div>
        <!-- Card footer -->
        <div>
            <button class="rounded-md bg-pink-900 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-pink-800" onclick="loadModal('${movie.imdbID}')">Voir plus</button>
        </div>
      </div>
    </div>
  </div>
  `
);

const modalTemplate = (movie) => (
  `
  <div class="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"></div>
    <!-- Modal dialog -->
    <div id="news-modal" class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6">
      <div class="flex bg-white rounded shadow-lg overflow-auto w-full">
        <div>
            <img class="h-full" src="${movie.Poster != "N/A" ? movie.Poster : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'}" alt="affiche du movie ${movie.Title} height="200">
        </div>
        <div class="p-5">
            <!-- Modal header -->
            <div class="mb-2">
                <div class="text-lg font-semibold text-slate-800">${movie.Title}</div>
              
            </div>
            <!-- Modal content -->
            <ul class="text-sm space-y-2 mb-3 text-slate-800">
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar shrink-0 mr-3" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <rect x="4" y="5" width="16" height="16" rx="2" />
                  <line x1="16" y1="3" x2="16" y2="7" />
                  <line x1="8" y1="3" x2="8" y2="7" />
                  <line x1="4" y1="11" x2="20" y2="11" />
                  <line x1="11" y1="15" x2="12" y2="15" />
                  <line x1="12" y1="15" x2="12" y2="18" />
                </svg>
                <p>${movie.Released}</p>
              </li>
              <li class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-license shrink-0 mr-3" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11" />
                  <line x1="9" y1="7" x2="13" y2="7" />
                  <line x1="9" y1="11" x2="13" y2="11" />
                </svg>
                <p>${movie.Plot}</p>
              </li>
          </ul>
        </div>
        <svg class="w-4 h-4 fill-current m-5" onclick='deleteMovie()'>
            <path d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z"></path>
        </svg>
      </div>
  </div>
  `
);