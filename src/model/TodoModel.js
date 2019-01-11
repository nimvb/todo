import { types } from "mobx-state-tree";

const Data = {
    id: "0",
    title: "Task 1",
    completed: false
};

export const TodoItem = types
    .model({
        id: types.string,
        title: types.string,
        completed: types.optional(types.boolean, false)
    })
    .actions(self => ({
        toggle() {
            self.completed = !self.completed;
        },
        changeTitle(title) {
            self.title = title;
        },
        changeCompleted(completed) {
            self.completed = completed;
        }
    }))
    .views(self => ({
        get itemTitle() {
            return self.title
        },
        get itemId() {
            return self.id
        },
        get isCompleted() {
            return self.completed
        }

    }));

export const TodoList = types
    .model({
        items: types.optional(types.array(TodoItem), []),
        mode: types.optional(types.string, "all")
    })
    .actions(self => ({
        addItem(item) {
            self.items.push(item);
        },
        removeItem(id) {
            const index = self.items.findIndex((item) => {
                return item.id === id
            })
            self.items.splice(index, 1);
        },
        removeItems(status) {
            self.items = self.items.filter((item) => {
                return item.completed === !status
            })
        },
        addItemByTtitle(title) {
            let uuid = require('uuid/v4')
            const id = uuid();
            self.items.push({
                id: id,
                title: title,
                completed: false
            })
        },
        setMode(mode) {
            self.mode = mode;
        },
        toggleItems() {
            const found = self.items.find((item) => item.completed === false) !== undefined;

            for (let index = 0; index < self.items.length; index++) {
                if (found) {
                    self.items[index].changeCompleted(true);
                } else {
                    self.items[index].changeCompleted(false);
                }

            }

        }
    }))
    .views(self => ({
        getItem(id) {
            return self.items.filter(item => {
                return item.id === id;
            });
        },
        get completedItems() {
            return self.items.filter(item => {
                return item.completed === true;
            });
        },
        get unCompletedItems() {
            return self.items.filter(item => {
                return item.completed === false;
            });
        },
        get completedItemsCount() {
            return self.items.filter(item => {
                return item.completed === true;
            }).length;
        },
        get unCompletedItemsCount() {
            return self.items.filter(item => {
                return item.completed === false;
            }).length;
        },
        get completedItemExists() {
            return self.items.find((item) => {
                return item.completed === true
            }) !== undefined

        },
        get empty() {
            return self.items.length === 0;
        },
        get unCompletedItemExists() {
            return self.items.find((item) => {
                return item.completed === false
            }) !== undefined
        },
        get currentItems() {
            if (self.mode === "all") {
                return self.items;
            }
            if (self.mode === "active") {
                return self.items.filter((item) => {
                    return item.completed === false
                })
            }
            if (self.mode === "completed") {
                return self.items.filter((item) => {
                    return item.completed === true
                })
            }

            return []
        }
    }));



export const todoList = TodoList.create()
