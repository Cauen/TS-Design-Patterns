/**
 * This example is same of object oriented, but using
 * only functions (but with side effects)
 */

interface Component {
  sumCost: () => number
}

interface Box extends Component {
  children: Component[]
  add: (item: Component) => void
  remove: (item: Component) => void
}

interface Item extends Component {
  cost: number
}

const createBox = (): Box => {
  let children: Component[] = []

  return {
    sumCost: () => children.reduce((curr, item) => curr + item.sumCost(), 0),
    add: (item: Component) => {
      children.push(item)
    },
    remove: (item: Component) => {
      children = children.filter(el => el !== item)
    },
    children,
  }
}

const createItem = (initialCost: number = 10): Item => {
  const cost = initialCost

  return {
    cost,
    sumCost: () => cost,
  }
}

const order = createBox()

const box1 = createBox()
const item1 = createItem()
const item2 = createItem()
box1.add(item1)
box1.add(item2)
box1.add(item2)

const box2 = createBox()
const item3 = createItem()
const item4 = createItem()
box1.add(item3)
box1.add(item4)

order.add(box1)
order.add(box2)

console.log(order.sumCost())