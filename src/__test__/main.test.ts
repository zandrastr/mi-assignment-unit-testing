/**
 * @jest-environment jsdom
 */

import * as main from '../ts/main';
import * as functions from '../ts/functions';
import { Todo } from "../ts/models/Todo";
import { createNewTodo, toggleTodo, clearTodos } from '../ts/main';

beforeEach(() => {
    document.body.innerHTML = "";
});

afterEach(() => {
      jest.restoreAllMocks();
});

describe ("check if function createNewTodo calls the correct function", () => {

    test('should call function createHtml', () => {
        // Arrange
        let tasks: Todo[] = [];
        let taskText = "My new task";
        let spy = jest.spyOn(main, "createHtml").mockReturnValue();
        
        // Act
        createNewTodo(taskText, tasks);

        // Assert
        expect(spy).toHaveBeenCalled();
    });  
    
    test('should call function displayError', () => {
        // Arrange
        let tasks: Todo[] = [];
        let taskText = "";
        let spy = jest.spyOn(main, "displayError").mockReturnValue();
        
        // Act
        createNewTodo(taskText, tasks);

        // Assert
        expect(spy).toHaveBeenCalled();
    });   
});

test('should call functions changeTodo and createHtml when function toggleTodo is called', () => {
    // Arrange
    let myTask = {text: "My new task", done: true};
    let spy1 = jest.spyOn(functions, "changeTodo").mockReturnValue();
    let spy2 = jest.spyOn(main, "createHtml").mockReturnValue();

    // Act
    toggleTodo(myTask);

    // Assert
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
});    

test('should call functions removeAllTodos and createHtml when function clearTodos is called', () => {
    // Arrange
    let tasks: Todo[] = [{text: "My first task", done: true}, {text: "My second task", done: false} ];
    let spy1 = jest.spyOn(functions, "removeAllTodos").mockReturnValue();
    let spy2 = jest.spyOn(main, "createHtml").mockReturnValue();

    // Act
    clearTodos(tasks);

    // Assert
    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
});    