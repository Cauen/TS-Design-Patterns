/**
 * This example is same of object oriented, but using
 * functional programming (pure functions)
 */

 interface Component {
  sumCost: () => number
}

interface Box extends Component {
  children: Component[]
}

interface Item extends Component {
  cost: number
}

const createBox = (children: Component[] = []): Box => ({
  sumCost: () => children.reduce((curr, item) => curr + item.sumCost(), 0),
  children,
})

const createItem = (cost: number = 10): Item => ({
  cost,
  sumCost: () => cost,
})

const item1 = createItem()
const item2 = createItem()
const box1 = createBox([item1, item2])

const item3 = createItem()
const item4 = createItem()
const box2 = createBox([item3, item4])

const order = createBox([box1, box2])

console.log(order.sumCost())