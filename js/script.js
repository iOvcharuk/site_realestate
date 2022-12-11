const swiper = new Swiper('.slider-main-block', {
	// Optional parameters
	loop: true,
	// Navigation arrows
	navigation: {
		nextEl: '.body-main-block__arrow.swiper-button-next',
		prevEl: '.body-main-block__arrow.swiper-button-prev',
	},
});

//Таби. Делегування кліку. Відсієюмо всі непотрібні кліки. Відслідк. натиск саме потрібних об’єктів
const tabNavItems = document.querySelectorAll(".tabs-deals__button");
const tabItems = document.querySelectorAll(".item-tabs");
const menuSubLink = document.querySelectorAll(".menu__sub-link");
document.addEventListener('click', function (e) {
	//target - елемент на який клікнули
	const targetElement = e.target;
	let currentActiveIndex = null;
	let newActiveIndex = null;
	if(targetElement.closest('.tabs-deals__button')) {
		tabNavItems.forEach((tabNavItem, index) => {
			if(tabNavItem.classList.contains('active')) {
				currentActiveIndex = index;
				tabNavItem.classList.remove('active');
			}
			if(tabNavItem === targetElement) {
				newActiveIndex = index;
			}
		});
		targetElement.classList.add('active');
		tabItems[currentActiveIndex].classList.remove('active');
		tabItems[newActiveIndex].classList.add('active');
	}
});

//Бургер скролл + подменю на touch screen
//Определяем на каком устройстве открыта страница
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android () ||
			isMobile.BlackBerry () ||
			isMobile.iOS () ||
			isMobile.Opera () ||
			isMobile.Windows ())
	}
};

if (isMobile.any()) {
	document.body.classList.add('_touch');

	let menuArrows = document.querySelectorAll('.menu__arrow');
	if (menuArrows.length > 0) {
		for (let index = 0; index < menuArrows.length; index++) {
			const menuArrow = menuArrows[index];
			document.addEventListener("click", function (e) {
				if (e.target.closest('.menu__arrow')) {
					menuArrow.parentElement.classList.toggle('_active-arrow');
				}
				if (!e.target.closest('.menu__arrow')) {
					menuArrow.parentElement.classList.remove('_active-arrow');
				}
			});
		}	
	}
} else {
	document.body.classList.add('_pc');
}

//Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuHeader = document.querySelector('.header__menu');
const headerLogo = document.querySelector('.header__logo');
if (iconMenu) {
	document.addEventListener("click", function (e) {
		if (e.target.closest('.menu__icon')) {
			document.body.classList.toggle('_lock');
			iconMenu.classList.toggle('_active-brg');
			menuHeader.classList.toggle('_active-brg');
			headerLogo.classList.toggle('_active-brg');
		}
		if (!e.target.closest('.menu__icon, .menu__arrow')) {
			document.body.classList.remove('_lock');
			iconMenu.classList.remove('_active-brg');
			menuHeader.classList.remove('_active-brg');
			headerLogo.classList.remove('_active-brg');
		}
	});
}

//Прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto], .menu__sub-link[data-goto], .menu-footer__link[data-goto]');  //Ищем елем с атрибутом data-goto
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick (e) {
		const menuLink = e.target; //Получаем целевой объект на который кликнули
		//Проверяем заполнен ли дата атрибут и существует ли объект на который ссылается дата атрибут
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto); //Получаем в константу сам объект
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight; //Выщитываем положение объекта с учетом высоты header
		
			if (iconMenu.classList.contains('_active-brg')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active-brg');
				menuHeader.classList.remove('_active-brg');
			}
			
			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}