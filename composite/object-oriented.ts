abstract class Component {
  protected parent: Component | null;
  protected cost: number;
  constructor(cost: number = 10) {
    this.cost = cost
  }

  public setParent(parent: Component | null) {
    this.parent = parent;
  }

  public getParent(): Component | null {
    return this.parent;
  }

  public add(component: Component): void { }

  public remove(component: Component): void { }

  public isBox(): boolean {
    return false;
  }

  public abstract sumCost(): number;
}

class Item extends Component {
  public sumCost() {
    return this.cost;
  }
}

class Box extends Component {
  private children: Component[] = [];

  public add(component: Component) {
    this.children.push(component);
    component.setParent(this);
  }

  public remove(component: Component): void {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);
    component.setParent(null);
  }

  public isBox(): boolean {
    return true;
  }

  public getItems() {
    return this.children.length
  }

  public sumCost() {
    return this
      .children
      .reduce(
        (previousValue, currentItem) =>
          previousValue + currentItem.sumCost(),
        0)
  }
}

const order = new Box();

const box1 = new Box();
box1.add(new Item(60));
box1.add(new Item());
box1.add(new Item());
order.add(box1);

const box2 = new Box();
box2.add(new Item());
box2.add(new Item());
box2.add(new Item(20));
order.add(box2);

console.log({ orderCost: order.sumCost() })


