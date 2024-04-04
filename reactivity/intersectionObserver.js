function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
// Целевой элемент находится в окне просмотра
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}

const observer = new IntersectionObserver(handleIntersection);
const targetElement = document.querySelector('.element-to-observe');

// Начало наблюдения за целевым элементом
observer.observe(targetElement);
