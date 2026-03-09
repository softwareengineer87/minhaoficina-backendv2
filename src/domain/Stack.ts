
class Stack {

  private count: number;
  private items: {};

  constructor() {
    this.count = 0;
    this.items = {};
  }

  push(element: any) {
    this.items[this.count] = element;
    this.count++;
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  isEmpty() {
    return this.count === 0;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objString = `${this.items[0]}`;
    for (let i = 0; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }

  getItems() {
    return this.items;
  }

  search(name: string) {
    if (this.isEmpty()) {
      return {};
    }
    const names = {};
    let index = 0;
    for (let i = 0; i < this.count; i++) {
      if (this.items[i].name.toLocaleLowerCase() === name) {
        names[index] = this.items[i];
        index++;
      }
    }
    return names;
  }

  clear() {
    this.count = 0;
    this.items = {};
  }

}

export { Stack }

