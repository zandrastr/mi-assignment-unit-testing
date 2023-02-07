/**
 * @jest-environment jsdom
 */

import * as main from '../ts/main';
import * as functions from '../ts/functions';
import { Todo } from "../ts/models/Todo";
import { createNewTodo, toggleTodo, clearTodos, createHtml } from '../ts/main';

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

describe("check if function createHtml creates elements and adds classes", () => {
    
    test('should create li element and add correct class', () => {
        // Arrange
        document.body.innerHTML = `<ul id="todos" class="todo"> </ul>`;
        let tasks: Todo[] = [{text: "My new task", done: false }];
        
        // Act
        createHtml(tasks);
        let existingLiElement: HTMLLIElement = document.querySelector(".todo__text") as HTMLLIElement;
        
        // Assert
        expect(existingLiElement.innerHTML).toEqual("My new task");
        expect(existingLiElement.classList.contains("todo__text")).toBeTruthy();
        expect(existingLiElement.classList.contains("todo__text--done")).toBeFalsy();
    });  
    
    test('should add class to li element when task is done', () => {
        // Arrange
        document.body.innerHTML = `<ul id="todos" class="todo"> </ul>`;
        let tasks: Todo[] = [{text: "My task", done: true }];
        
        // Act
        createHtml(tasks);
        let existingLiElement: HTMLLIElement = document.querySelector(".todo__text--done") as HTMLLIElement;
        
        // Assert
        expect(existingLiElement.classList.contains("todo__text--done"));
    });
});
  