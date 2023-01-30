/**
 * @jest-environment jsdom
 */

import { addTodo } from '../ts/functions';
import { changeTodo } from '../ts/functions';
import { removeAllTodos } from '../ts/functions';
import { Todo } from "../ts/models/Todo";

describe ("check user new task input and add or do not add to the todo list", () => {

    test('should add new task to the todo list if input text length is greater than 2', () => {
        // Arrange
        let tasks: Todo[] = [];
        let tasksLength = tasks.length;
        let taskText = "My new task";
        
        // Act
        addTodo(taskText, tasks);
        
        // Assert
        expect(taskText.length).toBeGreaterThan(2);
        expect(taskText).toBe("My new task");
        expect(tasks.length).toBe(tasksLength + 1);
    });
    
    test('should not add new task to the todo list if input text length is less than or equal to 2', () => {
        // Arrange
        let tasks: Todo[] = [];
        let tasksLength = tasks.length;
        let taskText = "";
        
        // Act
        addTodo(taskText, tasks);
        
        // Assert
        expect(taskText.length).toBeLessThanOrEqual(2);
        expect(taskText).toBe("");
        expect(tasks.length).toBe(tasksLength);
    });
});

describe ("check if task status toggles correctly between done and not done", () => {

    test('should change the task status to done: truthy', () => {
        // Arrange
        let task: Todo = {text: "My task", done: false};

        // Act
        changeTodo(task);
        
        // Assert
        expect(task.done).toBeTruthy();
    });

    test('should change the task status to done: falsy', () => {
        // Arrange
        let task: Todo = {text: "My task", done: true};

        // Act
        changeTodo(task);
        
        // Assert
        expect(task.done).toBeFalsy();
    });
});
  
test('should remove all tasks from the todo list', () => {
    // Arrange
    let tasks: Todo[] = [{text: "A task", done: true}, {text: "Another task", done: true}];

    // Act
    removeAllTodos(tasks)

    // Assert
    expect(tasks.length).toBe(0);
});