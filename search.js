const search_btn2 = document.getElementById('test_btn')

search_btn2.onclick = function () {
    event.preventDefault();
    let tmp = document.getElementById('blank').value;
    search_btn(tmp);
}

search_btn2.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();                    
      search_btn(this.value);                
    }
  });
function search_btn(input) {
    const temp = document.getElementById('cardbox');
    let name = `${input}`;
    temp.innerHTML = "";
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzIzMzk3ZDg5YmFlNWY4NWE1ZDk4YzZmZmNjMmFiNCIsIm5iZiI6MTc0NjIzOTE2NC4zMzMsInN1YiI6IjY4MTU3ZWJjYjRlNjVmNDNjOTkwN2U4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9bpbdyPcCuRa9Jt-RQZPJ-VXdQN2QQfW8GutEjfY67E'
        }
    };

    fetch(`https://api.themoviedb.org/3/search/movie?query=${name}`, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (!data || !data.results || !data.results.length === 0 || data['total_results'] === 0) {
                temp.innerHTML = `
                    <div class="card">
                        <p style="color: black;">이런! 찾으시는 결과가 없습니다</p>
                    </div>`;
                return;
            }

            let rows = data['results'];

            rows.forEach(a => {
                let id = a.id;
                let poster_path = a.poster_path;
                let original_title = a.original_title;
                let vote_average = a.vote_average;
                let overview = a.overview;

                overview = overview.slice(0, 40) + '....';

                const root_url = 'https://image.tmdb.org/t/p/original';
                const full_poster_path = root_url + poster_path;

                const temp_html = `
          <div class="card" data-id="${id}">
            <img src="${full_poster_path}"
                 class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${make_btn(original_title)}</h5>
              <p class="card-text">${vote_average}</p>
              <p class="card-text">${overview}</p>  
            </div>
          </div>
        `;

                temp.innerHTML += temp_html;
            });
        })

}