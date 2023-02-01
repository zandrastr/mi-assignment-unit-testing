/**
 * @jest-environment jsdom
 */

import * as main from '../ts/main';
import { Todo } from "../ts/models/Todo";
import { createNewTodo } from '../ts/main';

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


