export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, ...components) => {
  components.forEach((component) => container.append(component.getElement()));
};
