import { TodoItem, TodoList } from './TodoModel'
import { reaction } from 'mobx'

it("can create an instance of a model", () => {

    const item = TodoItem.create({
        id: "0",
        title: "Task 1",
        completed: false
    })

    expect(item.id).toBe("0")
    expect(item.title).toBe("Task 1")
    expect(item.completed).toBe(false)
    item.toggle()
    expect(item.completed).toBe(true)
    item.toggle()
    expect(item.completed).toBe(false)
    item.changeTitle("Task 2")
    expect(item.title).toBe("Task 2")
    item.changeCompleted(true)
    expect(item.completed).toBe(true)

})

it("can create a todo list", () => {
    
    const todos = TodoList.create({
        items: [
            {
                id: "0",
                title: "Task 1",
                completed: false
            }
        ]
    })

    expect(todos.items.length).toBe(1)
    expect(todos.items[0].id).toBe("0")
    expect(todos.items[0].title).toBe("Task 1")
    expect(todos.items[0].completed).toBe(false)
})

it("can add a new todo item", () => {
    const todos = TodoList.create();
    todos.addItem({
        id: "0",
        title: "Task 1",
        completed: false
    })
    expect(todos.items.length).toBe(1)
})

it("can monitor tasks status", () => {
    const todos = TodoList.create();
    todos.addItem({
        id: "0",
        title: "Task 1",
        completed: false
    })
    todos.addItem({
        id: "0",
        title: "Task 1",
        completed: false
    })
    todos.addItem({
        id: "0",
        title: "Task 1",
        completed: false
    })
    expect(todos.items.length).toBe(3)
    const completedItemsCount = todos.completedItemsCount
    expect(completedItemsCount).toBe(0)
    const unCompletedItemsCount = todos.unCompletedItemsCount
    expect(unCompletedItemsCount).toBe(3)
    let completedItemsChanged = 0;
    reaction(() => todos.completedItemsCount,() => completedItemsChanged += 1)
    todos.items[0].changeCompleted(true)
    expect(completedItemsChanged).toBe(1)
    todos.items[0].changeCompleted(false)
    expect(completedItemsChanged).toBe(2)
})