function handleMutations(mutationsList, observer) {
  mutationsList.forEach((mutation) => {
// Атрибут наблюдаемого элемента изменился
    if (mutation.type === 'attributes') {
      console.log(`Attribute '${mutation.attributeName}' changed to '${mutation.target.getAttribute(mutation.attributeName)}'`);
    }
  });
}

const observer = new MutationObserver(handleMutations);
const targetElement = document.querySelector('.element-to-observe');

// Начало наблюдения за целевым элементом
observer.observe(targetElement, { attributes: true });
