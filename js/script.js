"use strict"
//SPOLLERS

//АТТРИБУТЫ В HTML:
//ДЛЯ ОБОЛОЧЕК СПОЙЛЕРОВ - data-spollers 
//ДЛЯ ЗАГОЛОВКОВ СПОЙЛЕРОВ - data-spoller
//ДЛЯ ВОЗМОЖНОСТИ ПЕРЕХОДА ПО НАЖАТИЮ НА TAB ПО ЗАГОЛОВКАМ СПОЙЛЕРОВ tabindex="-1"
//ЕСЛИ ХОТИМ ЧТОБЫ ОТКРЫВАЛСЯ ТОЛЬКО ОДИН ЗАГОЛОВОК СПОЙЛЕРА - data-one-spoller 


//initSpolles - функция которая по клику вешает и убирает класс _init на спойлеры
//spollersRegular - массив не адаптивных спойлеров
//spollersArray  - массиав адапативных спойлеров
//mediaQueries - массив строк с информацией об адаптивных спойлерах 
//breakpoint - элементы массива mediaQueries со строками типа 600, max
//matchMedia - 



const spollersArray = document.querySelectorAll('[data-spollers]'); //Получаем в переменную spollersArray (оболочки спойлеров) коллекцию элементов с дата-атрибутом spollers
if (spollersArray.length > 0) { //Проверяем есть ли на странице хотя бы один элемент spollersArray с дата-атрибутом spollers
   //ПОЛУЧАЕМ МАССИВ ОБЫЧНЫХ (НЕ АДАПТИВНЫХ) СПОЙЛЕРОВ
   const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) { //С помощью Array.from мы переводим коллекцию spollersArray в массив, затем получаем в переменную spollersRegular массив spollersArray и фильтурем его для дальнешего разделения на обычные спойлеры и медиа-адаптивные спойлеры
      return !item.dataset.spollers.split(",")[0]; //Возвращаем с помощью функции все элементы у которых нет параметров дата-атрибута 
   });
   //ИНИЦИАЛИЗАЦИЯ ОБЫЧНЫХ СПОЛЙЕРОВ
   if (spollersRegular.length > 0) { //Проверяем есть ли на странице хотя бы один элемент spollersRegular
      initSpollers(spollersRegular); //Передаем в будущую функцию initSpollers массив spollersRegular 
   }

   //ПОЛУЧАЕМ СПОЙЛЕРЫ С МЕДИА ЗАПРОСАМИ (АДАПТИВНЫЕ)
   const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) { //С помощью Array.from мы переводим коллекцию spollersArray в массив, затем получаем в переменную spollersMedia массив spollersArray и фильтурем его для дальнешего разделения на обычные спойлеры и медиа-адаптивные спойлеры
      return item.dataset.spollers.split(",")[0]; //Возвращаем с помощью функции все элементы у которых есть параметр дата-атрибута
   });

   //ИНИЦИАЛИЗАЦИЯ СПОЙЛЕРОВ С МЕДИА ЗАПРОСАМИ (АДАПТИВНЫХ) 
   if (spollersMedia.length > 0) { //Проверяем есть ли на странице хотя бы один элемент spollersMedia 
      const breakpointsArray = []; //Создаем пустой массив breakpointsArray для дальнейшего наполнения
      spollersMedia.forEach(item => { //С помощью метода forEach мы перебираем массив объектов spollersMedia и присваеваем каждый элемент данного массива в переменную item
         const params = item.dataset.spollers; //Получаем в переменную params строку с параметрами для каждого объекта (в качестве примера задаем в html data-spollers="650,min" или data-spollers="800,max")
         const breakpoint = {}; //Создаем пустой объект (ассоциативный массив) для дальнейшего наполнения
         const paramsArray = params.split(","); //С помощью метода split разделяем строку внтури переменной params на массив подстрок с разделителем в качестве запятой "," и возвращаем новый массив 
         breakpoint.value = paramsArray[0]; //В объекте breakpoint создаем ключ value со значением в качестве нулевой ячейки (индекса) массива paramsArray 
         breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max"; //В объекте breakpoint создаем ключ type со значением в качестве первой ячейки (индекса) массива paramsArray, но если первой ячеки не существует, условием будет значение "max"  
         breakpoint.item = item; //В объекте breakpoint создаем ключ item со значением в качестве самого объекта
         breakpointsArray.push(breakpoint); //Добавляем объект (ассоциативный массив) breakpoints в массив breakpointsArray
      });

      //ПОЛУЧАЕМ УНИКАЛЬНЫЕ БРЕЙКПОИНТЫ 
      let mediaQueries = breakpointsArray.map(function (item) { // Объявляем переменную mediaQueries в которую присваиваем значение массива breakpointsArray и с помощью метода .map перебираем последний массив 
         return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type; //Возвращаем в перебранный массив значение строки по типу (max-width: 600px), 600px, max - в качестве примера
      });
      mediaQueries = mediaQueries.filter(function (item, index, self) { // В массиве mediaQueries мы запускаем функцию фильтрации с помощью метода .filter
         return self.indexOf(item) === index; // И получаем в данный массив уникальные брейкпоинты без дублей
      });

      //РАБОТАЕМ С КАЖДЫМ БРЕЙКПОИНТОМ
      mediaQueries.forEach(breakpoint => { // Перебираем массив mediaQueries с помощью метода forEach и присваиваем каждый элемент данного массива в переменную breakpoint
         const paramsArray = breakpoint.split(","); // В переменную paramsArray присваиваем строку массива mediaQueries, разделяем её с помощью метода split запятой "," и возвращаем её в виде массива
         const mediaBreakpoint = paramsArray[1]; // В переменную mediaBreakpoint присваеваем первую ячейку (индекса) массива mediaQueries - число (например 600)
         const mediaType = paramsArray[2]; // В переменную mediaType присваеваем вторую ячейку (индекса) массива mediaQueries - строку (например max)
         const matchMedia = window.matchMedia(paramsArray[0]); //В переменную matchMedia помещаем значение в виде прослушивания ширины экрана (paramsArray[0]);

         //ОБЪЕКТЫ С НУЖНЫМИ УСЛОВИЯМИ 
         const spollersArray = breakpointsArray.filter(function (item) { // Создаем переменную spollersArray присваиваем значения изначального массива всех брейкпоинтов breakpointsArray фильтруем его с помощью метода .filter
            if (item.value === mediaBreakpoint && item.type === mediaType) { // Собираем в константу spollersArray все объекты которые у которых совпадает и число [0] например 600 и тип например max [1] 
               return true; // Возвращаем булевое значение true
            }
         });
            
         //СОБЫТИЕ 
         matchMedia.addListener(function () { // Вешаем функцию на переменную matchMedia 
            initSpollers(spollersArray, matchMedia); // в функцию initSpollers собранный массив объектов spollersArray и константу matchMedia 
         });
         initSpollers(spollersArray, matchMedia); // Запускаем функцию initSpollers для того чтобы она отработала сразу при загрузке страницы
      });
   }

   //ИНИЦИАЛИЗАЦИЯ 
   function initSpollers(spollersArray, matchMedia = false) { // Создаем функцию initSpollers в которую получаем два параметра в виде массива spollersArray и константы matchMedia, но если мы не передаем константу matchMedia, то её значение будет равно false  
      spollersArray.forEach(spollersBlock => { // Перебираем массив spollersArray с помощью метода .forEach и присваиваем и присваеваем каждый элемент данного массива в переменную spollerBlock
         spollersBlock = matchMedia ? spollersBlock.item : spollersBlock; // Если matchMedia не равно нулю (true), мы получаем элемент объекта spollersBlock 
         if (matchMedia.matches || !matchMedia) { // Если  наш брейкпоинт сработал или мы передали обычные (не адаптивные) спойлеры
            spollersBlock.classList.add('_init'); // Добавляем спойлеру технический класс _init 
            initSpollerBody(spollersBlock); // Отправляем спойлер в будущую функцию initSpollersBody
            spollersBlock.addEventListener("click", setSpollerAction) // Вешаем на спойлер событие клик и вызываем будущую функцию которую напишем позднее
         } else { // Иначе...
            spollersBlock.classList.remove('_init'); // Отменяем технический класс _init у спойлера 
            initSpollerBody(spollersBlock, false); // Отправляем спойлер и параметр false в будущую функцию initSpollersBody 
            spollersBlock.removeEventListener("click", setSpollerAction); // Убираем со спойлера событие клик и вызываем будущую функцию которую напишем позднее
         }
      });  
   }

   //РАБОТА С КОНТЕНТОМ 
   function initSpollerBody(spollersBlock, hideSpollerBody = true) { // Создаем функцию в которую передаем два параметра в виде отдельного блока со спойлерами и hideSpollerBody равное true
      const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]'); // Получаем все заголовки спойлеров конкретного блока
      if (spollerTitles.length > 0) { // Проверяем есть ли у нас заголовки спойлеров 
         spollerTitles.forEach(spollerTitle => { // Перебираем массив заголовков с помощью метода .forEach и присваеваем каждый элемент данного массива в переменную spollerTitle
            if (hideSpollerBody) { // Если hideSpollerBody равен true 
               spollerTitle.removeAttribute('tabindex'); // Убираем у заголовка аттрибут tabindex (включение возможности перехода по заголовкам по нажатию на tab)
               if (!spollerTitle.classList.contains('_active')) { // Если у заголовка отсутствует класс _active 
                  spollerTitle.nextElementSibling.hidden = true; // Тогда мы скрываем контентную часть 
               }
            } else { 
               spollerTitle.setAttribute('tabindex', '-1'); // Иначе мы добавляем заголовку аттрибут tabindex со значением -1
               spollerTitle.nextElementSibling.hidden = false; // Показываем контенктные блоки если они были скрыты
            } 
         });
      }
   }
   function setSpollerAction(e) {
      const el = e.target;
      if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
         const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
         const spollersBlock = spollerTitle.closest('[data-spollers]');
         const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
         if (!spollersBlock.querySelectorAll('._slide').length) {
            if (oneSpoller && !spollerTitle.classList.contains('_active')) {
               hideSpollersBody(spollersBlock);
            }
            spollerTitle.classList.toggle('_active');
            _slideToggle(spollerTitle.nextElementSibling, 400);
         }
         e.preventDefault();
      }
   }
   function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
      if (spollerActiveTitle) {
         spollerActiveTitle.classList.remove('_active');
         _slideUp(spollerActiveTitle.nextElementSibling, 400);
      }
   }
}

//=======================================================================================================================================================================
//SlideToggle 
let _slideUp = (target, duration = 400) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = target.offsetHeight + 'px';
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0; 
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
         target.hidden = true;
         target.style.removeProperty('height');
         target.style.removeProperty('padding-top');
         target.style.removeProperty('padding-bottom');
         target.style.removeProperty('margin-top');
         target.style.removeProperty('margin-bottom');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
      }, duration);
   }
}
let _slideDown = (target, duration = 400) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');
      if (target.hidden) {
         target.hidden = false;
      }
      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0; 
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight; 
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      }, duration);
   }
}
let _slideToggle = (target, duration = 400) => {
   if (target.hidden) {
      return _slideDown(target, duration);
   } else {
      return _slideUp(target, duration);
   }
}

//Караганда 609655
//Актобе 610611
//Токио 1850147 
function weatherKrg () {
   fetch('https://api.openweathermap.org/data/2.5/weather?id=609655&appid=7b7e0e14530b8152ce001881f1bd80b2')
   .then(function (resp) {return resp.json() })
   .then(function (data) {
      console.log(data);
      document.querySelector('.weather__degrees-krg').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
      document.querySelector('.weather__description-krg').innerHTML = data.weather[0]['description'];
      document.querySelector('.weather__icon-krg').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
   })
   .catch(function () {

   });
}
function weatherAkb () {
   fetch('https://api.openweathermap.org/data/2.5/weather?id=610611&appid=7b7e0e14530b8152ce001881f1bd80b2')
   .then(function (resp) {return resp.json() })
   .then(function (data) {
      console.log(data);
      document.querySelector('.weather__degrees-akb').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
      document.querySelector('.weather__description-akb').innerHTML = data.weather[0]['description'];
      document.querySelector('.weather__icon-akb').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
   })
   .catch(function () {

   });
}
function weatherMsc () {
   fetch('https://api.openweathermap.org/data/2.5/weather?id=524894&appid=7b7e0e14530b8152ce001881f1bd80b2')
   .then(function (resp) {return resp.json() })
   .then(function (data) {
      console.log(data);
      document.querySelector('.weather__degrees-msc').innerHTML = Math.round(data.main.temp - 273) + '&deg;';
      document.querySelector('.weather__description-msc').innerHTML = data.weather[0]['description'];
      document.querySelector('.weather__icon-msc').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
   })
   .catch(function () {

   });
}

weatherKrg();
weatherAkb();
weatherMsc();


document.querySelector('.weather__button-krg').addEventListener("click", () => {
   weatherKrg();
});

document.querySelector('.weather__button-akb').addEventListener("click", () => {
   weatherAkb();
});

document.querySelector('.weather__button-msc').addEventListener("click", () => {
   weatherMsc();
});





  

   