const cardBox    = document.getElementById('cardbox');
const modal      = document.querySelector('.modal');
const movie_info = modal.querySelector('.modal_popup');
const root_url   = 'https://image.tmdb.org/t/p/original';

cardBox.addEventListener('click', function(e) {
  const card = e.target.closest('.card');

  const movieId = card.getAttribute('data-id');

  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${MY_KEY}`)
  .then(res => res.json())
    .then(function(data) {

      let original_title     = data['original_title'];
      let vote_average       = data['vote_average'];
      let adult              = data['adult'];
      let backdrop_path      = data['backdrop_path'];
      let original_language  = data['original_language'];
      let popularity         = data['popularity'];
      let release_date       = data['release_date'];
      let vote_count         = data['vote_count'];
      let overview_long      = data['overview'];
      let label              = adult ? 'For Adult' : 'Non-Adult';

      let full_backdrop_path = root_url + backdrop_path;


      movie_info.innerHTML = '';


      movie_info.innerHTML = `
        <div class="modal_header">
        <button type="button" class="close_btn">닫기</button>
          <h3>${original_title}</h3>
          
        </div>
        <div class="modal_body">
          <img style="width:100%" src="${full_backdrop_path}" class="modal_poster">
          <p><strong>줄거리:</strong> ${overview_long}</p>
          <p><strong>개봉일:</strong> ${release_date}</p>
          <p><strong>평점:</strong> ${vote_average} (${vote_count} votes)</p>
          <p><strong>언어:</strong> ${original_language}</p>
          <p><strong>성인 여부:</strong> ${label}</p>
          <p><strong>인기도:</strong> ${popularity}</p>
        </div>
      `;

      const closeBtn = movie_info.querySelector('.close_btn');
      closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
      });

      modal.style.display = 'block';
    })
    .catch(function(err) {
      console.error('상세정보 로드 실패', err);
    });
});

