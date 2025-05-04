
function put_card(){

    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${MY_KEY}`;
    const temp = document.getElementById('cardbox');
    make_card(url,temp);
}

function make_btn(original_title){
    return original_title;
}
function make_card(url,temp){

    fetch(url).then(res => res.json()).then(data => {
        let rows = data['results']
        rows.slice(0,9).forEach(a => {
            let poster_path = a['poster_path'];
            let original_title = a['original_title'];
            let vote_average = a['vote_average'];
            let overview = a['overview'];
            let id = a['id'];
            
            overview = overview.slice(0,40);
            overview+="....";
            

            let root_url = 'https://image.tmdb.org/t/p/original'
            let full_poster_path = root_url+poster_path;
            
            let temp_html = `
                <div class="card" data-id="${id}" id="movie-${id}">
                    <img src="${full_poster_path}"
                        class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${make_btn(`${original_title}`)}</h5>
                        <p class="card-text" id="movie_id">id: ${id}</p>
                        <p class="card-text">${vote_average}</p>
                        <p class="card-text">${overview}</p>  
                        
                    </div>
            </div>`;

            temp.innerHTML+=temp_html;

        });
}
);
}
