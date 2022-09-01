/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const adv = document.querySelectorAll('.promo__adv img'),
      genre = document.querySelector('.promo__genre'),
      poster = document.querySelector('.promo__bg'),
      movieList = document.querySelector('.promo__interactive-list'),
      addForm = document.querySelector('form.add'),
      addInput = document.querySelector('.adding__input'),
      checkbox = document.querySelector('[type="checkbox"]');

addForm.addEventListener('submit', (event) => {
    event.preventDefault(); // отменяет события браузера

    let newFilm = addInput.value; // в value находиться что ввел пользователь
    const favorite = checkbox.checked; //для получания boolen значения
    
    if(newFilm) {

        if(newFilm.length > 21) {
            newFilm = `${newFilm.substring(0, 22)}...`; 
        }

        if(favorite) {
            console.log("Добавляем любимый фильм");
        }

        movieDB.movies.push(newFilm); //добавление фильма в БД
        sortArr(movieDB.movies);
    
        createMoviesList(movieDB.movies, movieList); // добавление нового фильма на страницу
    }
  
    event.target.reset(); //очищение поля ввода
});

const deleteAdv = (arr) => {
    arr.forEach(item => {
        item.remove();
    });
};

const makeChanges = () => {
    genre.textContent = 'драма';

    poster.style.backgroundImage = "url('img/bg.jpg')";
};

const sortArr = (arr) => {
    arr.sort();
};

function createMoviesList(films, parent) {
    parent.innerHTML = "";
    sortArr(films);

    films.forEach((film, i) => {
        parent.innerHTML += `<li class="promo__interactive-item">${i + 1} ${film}<div class="delete"></div>`;
    });

    document.querySelectorAll('.delete').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            btn.parentElement.remove();
            movieDB.movies.splice(i, 1);

            createMoviesList(films, parent);
        });
    });
}

deleteAdv(adv);
makeChanges();
createMoviesList(movieDB.movies, movieList);