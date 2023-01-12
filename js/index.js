"use strict" //Подключаем строгий режим
//yo
new WOW().init();

//BACKGROUND IMAGE
function ibg() {
   let ibg = document.querySelectorAll(".ibg");
   for (var i = 0; i < ibg.length; i++) {
      ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
   }
}
ibg();

//LAZZY SCROLLING PAGE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Для подключения скролла в HTML документе необходимо добавить к кнопке (ссылке) запускающей скролл атрибут data-goto=".имя__класса", где "имя__класса" это класс элемента к которому необходимо сделать скролл
const lazzyScrolls = document.querySelectorAll('.lazzy-scroll[data-goto]'); //Находим все ссылки .header__link в документе
if (lazzyScrolls.length > 0) { //Проверяем наличие в документе ссылок .header__link
   lazzyScrolls.forEach(lazzyScroll => { //Перебираем массив с полученными ссылками .header__link 
      lazzyScroll.addEventListener("click", onMenuLinkClick); //Вешаем событие клик на ссылку .header__link
   });
   function onMenuLinkClick(e) { //Создаем функцию при клике на меню .header__link
      const lazzyScroll = e.target; //Получаем целевую ссылку .header__link
      const gotoBlock = document.querySelector(lazzyScroll.dataset.goto); //Получаем данные из атрибута data-goto чтобы понять куда ведет ссылка
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header ').offsetHeight; //Отнимаем высоту шапки при подсчете расстояния скролла
      window.scrollTo({ //Запускаем скролл
         top: gotoBlockValue,  //Передаем значение высоты шапки
         behavior: "smooth" //Задаем плаавность скролла до объета
      });
      e.preventDefault(); //Отключаем функцию ссылки чтобы страница не обновлялась
   }
}

//SHOW SCROLL BUTTON/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showBtn() {
   const scrollBtn = document.querySelector('.scroll-btn');
   window.onscroll = () => {
      if (window.scrollY > 700) {
         scrollBtn.classList.add('active');
      } else if (window.scrollY < 700) {
         scrollBtn.classList.remove('active');
      }
   }
}
showBtn();

//MENU BURGER/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.querySelectorAll('.burger').forEach(e => { //Находим все элементы с классом .burger (кнопка бургер) на странице и запускаем стрелочную функцию в которой мы получаем в element наш бургер
   e.addEventListener('click', e => { //Вешаем событие клик на элемент в который мы получили наш бургер
      const body = document.querySelector('body'); //Объявляем переменную body и помещаем в неё элемент body
      const menuBurger = e.currentTarget.dataset.burger; //Получаем в переменную menuBurger значение дата-атрибута data-burger нажатого элемента с классом.burger
      const menuList = document.querySelector(`[data-menu=${menuBurger}]`); //Получаем в переменную menuList меню с дата атрибутом data-menu и привязываем ему значение дата атрибута data-burger 
      const headerArrows = document.querySelectorAll('.header__arrow'); //Получаем в переменную headerArrows все элементы с классом .header__arrows (стрелочки выпадающего подменю)
      const headerItems = document.querySelectorAll('.header__item'); //Объявляем переменную menu и помещаем в неё главное header-menu
      const burger = document.querySelector('.header__burger'); //Объявляем переменную burger и помещаем в неё главный меню-бургер

      let intervalId; // Объявляем переменную intervalId

      document.querySelectorAll('.header__sub-list').forEach(function (e) { //Находим все элементы с классом .header__sub-list (выпадающее подменю) 
         if (e.classList.contains('open')) { //Если у выпадающего подменю есть класс .open
            e.classList.remove('active'); //Тогда мы удаляем у выпадающего подменю класс .active
            headerArrows.remove('active'); //И удаляем у стрелочек выпадающего подменю класс .open
         }
      });

      document.querySelectorAll('.header__menu').forEach(e => { //Находим все элементы с классом .header__menu (выпадающее меню) на странице и запускаем стрелочную функцию в которой мы получаем в element наше выпадающее меню
         if (!menuList.classList.contains('open')) { //Если выпадающее меню не имеет класса .open
            menuList.classList.add('active'); //Добавляем выпадающему меню класс .active 
            burger.classList.add('active'); //Добавляем бургеру класс .active 
            body.classList.add('lock'); //Добавляем телу страницы класс .lock

            intervalId = setTimeout(() => {
               menuList.classList.add('open'); //Добавляем выпадающему меню класс .open но с задержкой по времени, после добавления всех вышеупомянутых классов
            }, 0);
         }

         if (menuList.classList.contains('open')) { ///Если выпадающее меню имеет класс .open
            clearTimeout(intervalId);
            menuList.classList.remove('active'); //Удаляем выпадающему меню класс .active 
            burger.classList.remove('active'); //Удаляем бургеру класс .active 
            body.classList.remove('lock'); //Удаляем телу страницы класс .lock
            intervalId = setTimeout(() => {
               menuList.classList.remove('open'); //Удаляем выпадающему меню класс .open но с задержкой по времени, после удаления всех вышеупомянутых классов
            }, 0);
         }
      });
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      window.onclick = e => { //Функция закрытия меню по клику вне обслати меню
         let headerArrow = ''; //Объявляем переменную headerArrow со значением пустой строки
         for (let i = 0; i < headerArrows.length; i++) { //Запускаем цикл перебора массива .header__arrow
            headerArrow += headerArrows[i]; //Задаем переменной headerArrow значение headerArrows с индексом
            if (e.target == headerArrow) { //Если целью клика является переменная headerArrow (стрелочка выпадающего подменю)
               return; //Тогда возвращаем функцию (ничего не происходит)
            }
         }

         let headerItem = ''; //Объявляем переменную headerItem со значением пустой строки
         for (let i = 0; i < headerItems.length; i++) { //Запускаем цикл перебора массива .header__item
            headerItem += headerItems[i]; //Задаем переменной headerItem значение headerItems с индексом
            if (e.target == menuList //Если целью клика является переменная menuList (выпадающее меню) 
               || e.target == burger //Если целью клика является переменная burger (бургер)
               || e.target == headerItem //Если целью клика является переменная headerItem (элемент списка выпадающего меню)
            ) {
               return; //Тогда возвращаем функцию (ничего не происходит)
            } else { //Иначе
               menuList.classList.remove('active'); //Удаляем класс .active у выпадающего меню
               menuList.classList.remove('open'); //Удаляем класс .open у выпадающего меню
               burger.classList.remove('active'); //Удаляем класс .active у бургера
               body.classList.remove('lock'); //Удаляем класс .lock у тела страницы
            }
         }
      }
   })
});

//DROPDOWNS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
document.querySelectorAll('.header__link').forEach(e => { //Находим все элементы с классом .header__link (пункт меню) на странице и запускаем стрелочную функцию в которой мы получаем в element наш пункт меню
   e.addEventListener('click', e => { //Вешаем событие клик на элемент в который мы получили наш пункт меню
      const body = document.querySelector('body'); //Объявляем переменную body и помещаем в неё элемент body
      const menu = document.querySelector('.header__menu'); //Объявляем переменную menu и помещаем в неё главное header-menu
      const burger = document.querySelector('.header__burger'); //Объявляем переменную burger и помещаем в неё главный меню-бургер
      const headerLink = e.currentTarget.dataset.link;  //Получаем в переменную headerLink значение дата-атрибута data-link нажатого элемента с классом .header__link
      const headerSubList = document.querySelector(`[data-sublist=${headerLink}]`); //Получаем в переменную headerSubList подменю с дата атрибутом data-sublist и привязываем ему значение дата атрибута data-link 
      const headerArrow = document.querySelector(`[data-arrow=${headerLink}]`); //Получаем в переменную headerArrow стрелочку с дата атрибутом data-arrow и привязываем ему значение дата атрибута data-link 
      const headerItems = document.querySelectorAll('.header__item'); //Получаем в переменную headerItems пункт главного меню 

      let intervalId; // Объявляем переменную intervalId
      //Функция на выпадающее подменю//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      document.querySelectorAll('.header__sub-list').forEach(e => { //Находим все элементы с классом .header__sub-list (выпадающее подменю) 
         if (!headerArrow.classList.contains('open') || !headerSubList.classList.contains('open')) { //Если выпадающее подменю или стролочка не имеют класса .open
            e.classList.remove('active'); //Тогда мы удаляем у всех выпадающих подменю и у стрелочек класс .active
            e.classList.remove('open'); //И удаляем у всех выпадающих подменю и у стрелочек класс .open
            headerSubList.classList.add('active'); //Добавляем нажатому выпадающему подменю класс .active 

            intervalId = setTimeout(() => {
               headerSubList.classList.add('open'); //Добавляем выпадающему подменю класс .open но с задержкой по времени, после добавления всех вышеупомянутых классов
            }, 0);
         }

         if (headerArrow.classList.contains('open') || headerSubList.classList.contains('open')) { //Если выпадающее подменю или стролочка имеют класс .open
            clearTimeout(intervalId);
            headerSubList.classList.remove('active'); //Удаляем у нажатого выпадающего подменю класс .active
            intervalId = setTimeout(() => {
               headerSubList.classList.remove('open'); //Удаляем выпадающему подменю класс .open но с задержкой по времени, после удаления всех вышеупомянутых классов
            }, 0);
         }
      });
      //Функция на крутящуюся стрелочку/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      document.querySelectorAll('.header__arrow').forEach(e => { //Находим все стрелочки на странице и запускаем стрелочную функцию в которой мы получаем в element нашу стрелочку
         if (!headerArrow.classList.contains('open') || !headerSubList.classList.contains('open')) { //Если стрелочка или выпадающее подменю не имеют класса .open
            e.classList.remove('active'); //Тогда мы удаляем у всех выпадающих подменю и у стрелочек класс .active
            e.classList.remove('open'); //Удаляем у всех выпадающих подменю и у стрелочек класс .open
            headerArrow.classList.add('active'); //И добавляем нажатой стрелочке класс .active

            intervalId = setTimeout(() => {
               headerArrow.classList.add('open'); //добавляем нажатой стрелочке класс .open но с задержкой по времени, после добавления всех вышеупомянутых классов
            }, 0);
         }

         if (headerArrow.classList.contains('open') || headerSubList.classList.contains('open')) { //Если выпадающее подменю или стролочка имеют класс .open
            clearTimeout(intervalId);
            headerArrow.classList.remove('active'); //Удаляем у нажатой стрелочки класс .active 
            intervalId = setTimeout(() => {
               headerArrow.classList.remove('open'); //Удаляем нажатой стрелочки класс .open но с задержкой по времени, после удаления всех вышеупомянутых классов
            }, 0);
         }
         //Закрытие выпадающего подменю по клику вне области выпадалющего подменю///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         window.onclick = e => { //Функция закрытия подменю по клику вне обслати выпадающего подменю 
            let headerItem = ''; //Объявляем переменную headerItem со значением пустой строки
            for (let i = 0; i < headerItems.length; i++) { //Запускаем цикл перебора массива .header__item
               headerItem += headerItems[i]; //Задаем переменной headerItem значение headerItems с индексом
               if (e.target == headerSubList //Если целью клика является переменная headerSubList (выпадающее подменю)
                  || e.target == headerArrow //Если целью клика является переменная headerArrow (стрелочка выпадающего подменю)
                  || e.target == document.querySelector(`[data-link=${headerLink}]`) //Если целью клика является пункт меню с атрибутом data-link
                  || e.target == menu //Если целью клика является переменная menu (главное меню)
                  || e.target == headerItem) { //Если целью клика является пункт меню
                  return; //Тогда возвращаем функцию (ничего не происходит)
               } else {
                  headerArrow.classList.remove('active'); //Удаляем класс .active у стрелочек
                  headerArrow.classList.remove('open'); //Удаляем класс .open у стрелочек
                  headerSubList.classList.remove('active'); //Удаляем класс .active у выпадающего подменю
                  headerSubList.classList.remove('open'); //Удаляем класс .open у выпадающего подменю
                  menu.classList.remove('active'); //Удаляем класс .active у главного меню
                  menu.classList.remove('open'); //Удаляем класс .open у главного меню
                  burger.classList.remove('active'); //Удаляем класс .active у бургера
                  body.classList.remove('lock'); //Удаляем класс .lock у тела страницы
               }
            }
         }
         //Закрытие выпадающего подменю по нажатию на клавишу ESC/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         window.addEventListener('keydown', function (e) { //Функция закрытия подменю по нажатию клавиши esc
            if (e.keyCode == 27) { //Если нажатой клавишей является клавиша esc 
               if (headerArrow.classList.contains('active') || headerArrow.classList.contains('open') //Если у стрелочки есть класс .open и клас .active  
               ) {
                  headerArrow.classList.remove('active'); //Удаляем класс .active у стрелочек
                  headerArrow.classList.remove('open'); //Удаляем класс .open у стрелочек
                  headerSubList.classList.remove('active'); //Удаляем класс .active у выпадающего подменю
                  headerSubList.classList.remove('open'); //Удаляем класс .open у выпадающего подменю
               }
            }
         }.bind(this));
      });
   });
});



//SPOLLERS////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//SWIPER///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
new Swiper('.image-slider', {
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
   },
   pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
   },
   loop: true,
   autoplay: {
      delay: 3000,
      stopOnLastSlide: true,
      disableOnInteraction: false,
   },
   autoHeigth: true,
});
//TOGGLE CARDS//////////////////////////////////////////////////////////////////////////////////
function Cards(item) {
   const linkContent = document.querySelectorAll('.cards-item__content');
   const linkList = document.querySelectorAll('.cards-item__list');
   if (linkContent.length > 0) {
      item.forEach((el, i) => {
         el.addEventListener('click', e => {
            linkContent[i].classList.toggle('active');
            linkList[i].classList.toggle('active');
            e.preventDefault();
         });
      });
   };
};
Cards(document.querySelectorAll('.cards-item__link-item')); 
Cards(document.querySelectorAll('.cards-item__link-list'));
//SIMPLE TABS////////////////////////////////////////////////////////////////////////////////////////////////////////
function setHash(hash) {
   hash = hash ? `#${hash}` : window.location.href.split('#')[0];
   history.pushState('', '', hash);
}

function getHash() {
   if (location.hash) { return location.hash.replace('#', ''); }
}

function uniqArray(array) {
   return array.filter(function (item, index, self) {
      return self.indexOf(item) === index;
   });
}

function removeClasses(array, className) {
   for (let i = 0; i < array.length; i++) {
      array[i].classList.remove(className);
   }
}


let mediaValue = 0;
function dataMediaQueries(array, dataSetValue) {
   // Получение объектов с медиа запросами
   const media = Array.from(array).filter(function (item, index, self) {
      mediaValue = item.dataset[dataSetValue].split(",")[0];
      if (item.dataset[dataSetValue]) {
         return item.dataset[dataSetValue].split(",")[0];
      }
   });
   // Инициализация объектов с медиа запросами
   if (media.length) {
      const breakpointsArray = [];
      media.forEach(item => {
         const params = item.dataset[dataSetValue];
         const breakpoint = {};
         const paramsArray = params.split(",");
         breakpoint.value = paramsArray[0];
         breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
         breakpoint.item = item;
         breakpointsArray.push(breakpoint);
      });
      // Получаем уникальные брейкпоинты
      let mdQueries = breakpointsArray.map(function (item) {
         return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
      });
      mdQueries = uniqArray(mdQueries);
      const mdQueriesArray = [];
      if (mdQueries.length) {
         // Работаем с каждым брейкпоинтом
         mdQueries.forEach(breakpoint => {
            const paramsArray = breakpoint.split(",");
            const mediaBreakpoint = paramsArray[1];
            const mediaType = paramsArray[2];
            const matchMedia = window.matchMedia(paramsArray[0]);
            // Объекты с нужными условиями
            const itemsArray = breakpointsArray.filter(function (item) {
               if (item.value === mediaBreakpoint && item.type === mediaType) {
                  return true;
               }
            });
            mdQueriesArray.push({
               itemsArray,
               matchMedia
            })
         });
         return mdQueriesArray;
      }
   }
}

function tabs() {
   const tabs = document.querySelectorAll('[data-tabs]');
   const tabsTitle = document.querySelectorAll('.tabs__title');
   let tabsActiveHash = [];
   if (tabs.length > 0) {
      const hash = getHash();
      if (hash && hash.startsWith('tab-')) {
         tabsActiveHash = hash.replace('tab-', '').split('-');
      }
      tabs.forEach((tabsBlock, index) => {
         tabsBlock.classList.add('_tab-init');
         tabsBlock.setAttribute('data-tabs-index', index);
         tabsBlock.addEventListener("click", setTabsAction);
         initTabs(tabsBlock);
      });
      // Получение слойлеров с медиа запросами
      let mdQueriesArray = dataMediaQueries(tabs, "tabs");
      if (mdQueriesArray && mdQueriesArray.length) {
         mdQueriesArray.forEach(mdQueriesItem => {
            // Событие
            mdQueriesItem.matchMedia.addEventListener("change", function () {
               setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
            setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
         });
      }
   }
   // Установка позиций заголовков
   function setTitlePosition(tabsMediaArray, matchMedia) {
      tabsMediaArray.forEach(tabsMediaItem => {
         tabsMediaItem = tabsMediaItem.item;
         let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
         let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
         let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
         let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
         tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
         tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest('[data-tabs]') === tabsMediaItem);
         tabsContentItems.forEach((tabsContentItem, index) => {
            if (matchMedia.matches) {
               tabsContent.append(tabsTitleItems[index]);
               tabsContent.append(tabsContentItem);
               tabsMediaItem.classList.add('_tab-spoller');
            } else {
               tabsTitles.append(tabsTitleItems[index]);
               tabsMediaItem.classList.remove('_tab-spoller');
            }
         });
      }); 
   }
   // Работа с контентом
   function initTabs(tabsBlock) {
      let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
      let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
      const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

      if (tabsActiveHashBlock) {
         const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
         tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
      }
      if (tabsContent.length) {
         tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
         tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
         tabsContent.forEach((tabsContentItem, index) => {
            tabsTitles[index].setAttribute('data-tabs-title', '');
            tabsContentItem.setAttribute('data-tabs-item', '');

            if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
               tabsTitles[index].classList.add('_tab-active');
            }
            tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
         });
      }
   }
   function setTabsStatus(tabsBlock) {
      let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
      let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
      function isTabsAnamate(tabsBlock) {
         if (tabsBlock.hasAttribute('data-tabs-animate')) {
            return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
         }
      }
      const tabsBlockAnimate = isTabsAnamate(tabsBlock);
      if (tabsContent.length > 0) {
         const isHash = tabsBlock.hasAttribute('data-tabs-hash');
         tabsContent = Array.from(tabsContent).filter(item => item.closest('[data-tabs]') === tabsBlock);
         tabsTitles = Array.from(tabsTitles).filter(item => item.closest('[data-tabs]') === tabsBlock);
         tabsContent.forEach((tabsContentItem, index) => {
            if (tabsTitles[index].classList.contains('_tab-active')) {
               if (tabsBlockAnimate) {
                  _slideDown(tabsContentItem, tabsBlockAnimate);
               } else {
                  tabsContentItem.hidden = false;
               }
               if (isHash && !tabsContentItem.closest('.popup')) {
                  setHash(`tab-${tabsBlockIndex}-${index}`);
               }
            } else {
               if (tabsBlockAnimate) {
                  _slideUp(tabsContentItem, tabsBlockAnimate);
               } else {
                  tabsContentItem.hidden = true;
               }
            }
         });
      }
   }
   function setTabsAction(e) {
      const el = e.target;
      if (el.closest('[data-tabs-title]')) {
         const tabTitle = el.closest('[data-tabs-title]');
         const tabsBlock = tabTitle.closest('[data-tabs]');
         if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelector('._slide')) {
            let tabActiveTitle = tabsBlock.querySelectorAll('[data-tabs-title]._tab-active');
            tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest('[data-tabs]') === tabsBlock) : null;
            tabActiveTitle.length ? tabActiveTitle[0].classList.remove('_tab-active') : null;
            tabTitle.classList.add('_tab-active');
            setTabsStatus(tabsBlock);
         }
         //Функция скролла к первой кнопке аккордеона 
         function scrollTo(item) {
            item.forEach((e, i) => {
               if (window.matchMedia(`(max-width: ${mediaValue}px)`).matches) {
                  item[0].scrollIntoView(true);
                  window.scrollBy(0, -20);
               }
            });
         };
         scrollTo(tabsTitle);
         e.preventDefault();
      }
   }
   //Функция адаптивности аккордеона
   if (matchMedia) {
      const screen = window.matchMedia(`(max-width: ${mediaValue}px)`);
      screen.addListener(changes);
      changes(screen);
   }
   function changes(screen) {
      tabsTitle.forEach((item) => {
         if (screen.matches) {
            item.style.margin = '0 auto';
            item.style.marginBottom = '20px';
            item.style.width = '100%';
         } else {
            item.style.margin = '0 5px';
            item.style.marginBottom = '60px';
            item.style.width = '200px';
         }
      })
   }
}
tabs();

//Скрытие контента при наведении на карту
function hiddenInfo() {
   const map = document.querySelector('.footer__map');
   const info = document.querySelector('.footer__info');
   map.addEventListener('mouseover', () => {
      info.classList.add('hidden');
   });
   map.addEventListener('mouseout', () => {
      info.classList.remove('hidden');
   })
}
hiddenInfo();

//Подставляем текст наименования товара карточки в тайтл модального окна 
function cardsTextContent() {
   const cardsButton = document.querySelectorAll('.cards-item__button');
   const cardsSubtitle = document.querySelectorAll('.cards-item__subtitle');
   const modalsSubtitle = document.querySelector('.order-subtitle');
   cardsButton.forEach((item, i) => {
      item.addEventListener('click', e => {
         modalsSubtitle.textContent = cardsSubtitle[i].textContent;
      });
   });
}
cardsTextContent();

//POPUP
const modalButtons = document.querySelectorAll('.modal-button');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (modalButtons.length > 0) {
   modalButtons.forEach((modalButton) => {
      modalButton.addEventListener('click', e => {
         const modalName = e.currentTarget.dataset.button;
         const currentModal = document.querySelector(`[data-modal=${modalName}]`);
         modalOpen(currentModal);
         e.preventDefault();
      });
   });
}

const modalCloseIcon = document.querySelectorAll('.close-modal');
if (modalCloseIcon.length > 0) {
   modalCloseIcon.forEach((el) => {
      el.addEventListener('click', e => {
         modalClose(el.closest('.modal'));
         e.preventDefault();
      });
   });
}

function modalOpen(currentPopup) {
   if (currentPopup && unlock) {
      const modalActive = document.querySelector('.modal.open');
      if (modalActive) {
         modalClose(modalActive, false);
      } else {
         bodyLock();
      }
      currentPopup.classList.add('open');
      currentPopup.addEventListener('click', e => {
         if (!e.target.closest('.modal__content')) {
            modalClose(e.target.closest('.modal'));
         }
      });
   }
}
function modalClose(modalActive, doUnlock = true) {
   if (unlock) {
      modalActive.classList.remove('open');
      if (doUnlock) {
         bodyUnlock();
      }
   }
}
function bodyLock() {

   const lockPaddingValue = window.innerWidth - document.body.offsetWidth + 'px';
   if (lockPadding.length > 0) {
      lockPadding.forEach((el) => {
         el.style.paddingRight = lockPaddingValue;
      });
   }
   body.style.paddingRight = lockPaddingValue;
   body.classList.add('lock');

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnlock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         lockPadding.forEach((el) => {
            el.style.paddingRight = '0px';
         });
      }

      body.style.paddingRight = '0px';
      body.classList.remove('lock');
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}
document.addEventListener('keydown', (e) => {
   if (e.which === 27) {
      const modalActive = document.querySelector('.modal.open');
      modalClose(modalActive);
   }
});

// inputmask
const maskCall = document.querySelector('.call-form');
const maskOrder = document.querySelector('.order-form');
const maskConsultation = document.querySelector('.consultation-form');

// inputvalidate
const formCall = new JustValidate('.call-form');
const formOrder = new JustValidate('.order-form');
const formConsultation = new JustValidate('.consultation-form');

function validationForm(form, mask, name, tel, email) {
   const telSelector = mask.querySelector('input[type="tel"]');
   const inputMask = new Inputmask('+7 (999) 999-99-99');
   inputMask.mask(telSelector);

   form
      .addField(name, [
         {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Необходимо ввести минимум 3 символа',
            successMessage: '123',
         },
         {
            rule: 'maxLength',
            value: 30,
            errorMessage: 'Необходимо ввести не более 30 символов',
         },
         {
            rule: 'required',
            value: true,
            errorMessage: 'Введите имя'
         },
         {
            rule: 'customRegexp',
            value: /(^[а-яА-ЯёЁa-zA-Z ]+$)/,
            errorMessage: 'Допустимы только буквы'
         }
      ],
         {
            successMessage: 'Имя введено верно!',
         }
      )
      .addField(email, [
         {
            rule: 'required',
            value: true,
            errorMessage: 'Email обязателен',
         },
         {
            rule: 'email',
            value: true,
            errorMessage: 'Введите корректный Email',
         },
      ],
         {
            successMessage: 'Почта введена верно!',
         }
      )
      .addField(tel, [
         {
            rule: 'required',
            value: true,
            errorMessage: 'Телефон обязателен',
         },
         {
            rule: 'function',
            validator: function () {
               const phone = telSelector.inputmask.unmaskedvalue();
               return phone.length === 10;
            },
            errorMessage: 'Введите корректный телефон',
         },
      ],
         {
            successMessage: 'Телефон введен верно!',
         }
      ).onSuccess((event) => {
         console.log('Validation passes and form submitted', event);
         let formData = new FormData(event.target);
         console.log(...formData);
         let xhr = new XMLHttpRequest();
         xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
               if (xhr.status === 200) {
                  console.log('Отправлено');

               }
            }
         }
         xhr.open('POST', 'mail.php', true);
         xhr.send(formData);
         event.target.reset();

         //Показываем модальное окно при удачном прохождении валидации
         modalOpen(document.querySelector('#modal-thanks'));

         //Очистка полей формы 
         const validateSuccess = document.querySelectorAll('.just-validate-success-field');
         const validateLabel = document.querySelectorAll('.just-validate-success-label');
         validateLabel.forEach((item, i) => {
            validateSuccess[i].style.backgroundImage = 'none';
            validateSuccess[i].style.boxShadow = 'none';
            item.style.display = 'none';
         });

      });
}
validationForm(formCall, maskCall, '.call__name', '.call__tel', '.call__email');
validationForm(formOrder, maskOrder, '.order__name', '.order__tel', '.order__email');
validationForm(formConsultation, maskConsultation, '.consultation__name', '.consultation__tel', '.consultation__email');







