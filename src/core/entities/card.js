export default function buildCard(dependencies) {
  const { idHelper, dataHelper } = dependencies;

  return class Card {
    #id;
    #value;
    #shape;
    #color;
    #image;
    #covered;

    constructor(id, value, shape, color, image, covered) {
      this.#id = id;
      this.#value = value;
      this.#shape = shape;
      this.#color = color;
      this.#image = image;
      this.#covered = covered;
    }

    get id() {
      return this.#id;
    }

    set value(value) {
      this.#value = value;
    }

    get value() {
      return this.#value;
    }

    set shape(shape) {
      this.#shape = shape;
    }

    get shape() {
      return this.#shape;
    }

    set color(color) {
      this.#color = color;
    }

    get color() {
      return this.#color;
    }

    set image(image) {
      this.#image = image;
    }

    get image() {
      return this.#image;
    }

    set covered(covered) {
      this.#covered = covered;
    }

    get covered() {
      return this.#covered;
    }

    toJSON() {
      return dataHelper.removeUndefinedProperties({
        id: this.#id,
        value: this.#value,
        shape: this.#shape,
        color: this.#color,
        image: this.#image,
        covered: this.#covered,
      });
    }

    static fromJSON({ id, value, shape, color, image, covered } = {}) {
      return new Card(id, value, shape, color, image, covered);
    }

    static newInstance({ id = idHelper.generateId(), value, shape, color, image, covered = true } = {}) {
      return new Card(id, value, shape, color, image, covered);
    }
  };
}
