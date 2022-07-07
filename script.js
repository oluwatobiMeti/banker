'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const buttonScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

buttonScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   //console.log(s1coords);
//   console.log(target.getBoundingClientRect());
//   console.log("current scroll (x/y)", window.pageXOffset, window.pageYOffset);
//   window.scrollTo({ left: s1coords.left + window.pageXOffset, top: s1coords.top + window.pageYOffset, behavior: 'smooth' });
  //new way in modern js
  section1.scrollIntoView({ behavior: 'smooth' });
 });
//page navigation 
//event propagation
// document.querySelectorAll('.nav__link').forEach(
//   function (el) {
//     el.addEventListener('click', function (e) {
//       e.preventDefault();
//       const id = this.getAttributes('href');
//       document.querySelector(id).scrollIbtoView({ behavior: 'smooth' });
//     })
//   }
// )
//event delegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  const target = e.target;
  //console.log(target);
   //e.preventDefault();
  if (target.classList.contains('nav__link')) {
    console.log("works");
    e.preventDefault();
    const id = target.getAttribute('href');
    //console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
})

//tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  //console.log(clicked);
  if (!clicked) return;
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  console.log(clicked.dataset.tab);
  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});
//normal
// nav.addEventListener('mouseover', function (e) {
//   const link = e.target;
//   console.log(link);
//   if (!link.classList.contains('nav__link')) { return 0; }
//   if (link.classList.contains('nav__link')) {
//     const siblings = link.closest('nav').querySelectorAll('.nav__link');
//     const logo = link.closest('nav').querySelector('img');
//     siblings.forEach(sib => { if (sib !== link) { sib.style.opacity = 0.5} });
//     logo.style.opacity = 0.5;
//   }
// })
// nav.addEventListener("mouseout", function (e) {
//   const link = e.target;
//   console.log(link);
//   if (!link.classList.contains('nav__link')) {
//     return 0;
//   }
//   if (link.classList.contains('nav__link')) {
//     const siblings = link.closest('nav').querySelectorAll('.nav__link');
//     const logo = link.closest('nav').querySelector('img');
//     siblings.forEach(sib => {
//       if (sib !== link) {
//         sib.style.opacity = 1;
//       }
//     });
//     logo.style.opacity = 1;
//   }
// });
// refactored code
// const handler = function (e) {
//   const link = e.target;
//     console.log(link);
//     if (!link.classList.contains('nav__link')) {
//       return 0;
//     }
//     if (link.classList.contains('nav__link')) {
//       const siblings = link.closest('nav').querySelectorAll('.nav__link');
//       const logo = link.closest('nav').querySelector('img');
//       siblings.forEach(sib => {
//         if (sib !== link) {
//           sib.style.opacity = this;
//         }
//       });
//       logo.style.opacity = this;
//     }
// };
// nav.addEventListener("mouseover", handler.bind(0.5));
// nav.addEventListener("mouseout", handler.bind(1));
//sticky position of the navbar
const intailCoords = section1.getBoundingClientRect()
window.addEventListener('scroll', function () {
  if (this.window.scrollY > intailCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
})
// explaination of intersection observer api
// const obscallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }
// const obsoptions = {
//   root: null,
//   threshold: [0.2],
// }
// const observer = new IntersectionObserver(obscallBack, obsoptions);
// observer.observe(section1);
// intersection observer api in action
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const headerInterCallBack = function (enteries) {
  const [entry] = enteries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(headerInterCallBack, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);
const revealSection = function (enteries, observer) {
  const [entry] = enteries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
const allSection = document.querySelectorAll('.section');
//console.log(allSection);
allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// lazy image loading

const imgTargets = document.querySelectorAll('img[data-src]');
const loadimg = function (enteries, observer) {
  const [entry] = enteries;
  //console.log(entry);
  if (!entry.isIntersecting) return; else
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  
}
const imgObserver = new IntersectionObserver(loadimg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});
imgTargets.forEach(img => imgObserver.observe(img));

const slider = function () {
  // slider
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const slider = document.querySelector('.slider');
  const maxSlider = slides.length;
  let curSlider = 0;
  const NextSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  }
  const dotContainer = document.querySelector('.dots');
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide=${i}></button>`
      );
    });
  };
  createDots();
  // activate dots tonshow current
  const activateDot = function (slide) {
    const allDots = document.querySelectorAll('.dots__dot');
    allDots.forEach(dot => dot.classList.remove('dots__dot--active'));
    const doc = document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
    //console.log(doc);
  }
  activateDot(2)
  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  NextSlide(0);
  const toNextSlide = function () {
    if (curSlider === maxSlider - 1) {
      curSlider = 0;
    } else {
      curSlider++;
    }

    NextSlide(curSlider);
    activateDot(curSlider);
  }
  activateDot(0);
  // mext slide
  btnRight.addEventListener('click', toNextSlide);
  const prevSlide = function () {
    if (curSlider === 0) {
      curSlider = maxSlider - 1;
    } else {
      curSlider--;

      NextSlide(curSlider);
      activateDot(curSlider)
    }
  }
  btnLeft.addEventListener('click', prevSlide);

  // keyboard events
  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && toNextSlide();
    activateDot(curSlider);
  });
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      toNextSlide(slide);
    }
  });
}();



//code chalenge
const car = function (speed) {
  this.speed = speed;
}
car.prototype.accelerate = function () {
  return this.speed + 10;
}
car.prototype.brake = function () {
  return this.speed - 5;
}
let num = 9154984569;
const bmw = new car(120);
const mercedes = new car(95);
console.log(bmw.accelerate());
