import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../todo';
// const Visualforce = require('../lib/VFRemote');

declare var Visualforce: any;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  isLoading = true;
  showComplete = true;
  sortColumn: string;
  sortAscending = false;

  constructor() {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    Visualforce.remoting.Manager.invokeAction(
      'IEE_TodoViewController.getTodoList',
      (result, event) => {
        if (result) {
          this.isLoading = false;
          this.todos = result;
          this.sortByColumn('dueDate');
        }
      }, {
        buffer: false
      }
    );
  }

  getSortDirection(col: string) {
    return this.sortColumn === col ? !this.sortAscending : false;
  }

  sortByComplete(): void {
    this.sortAscending = this.getSortDirection('complete');
    this.todos.sort((a, b) => {
      if (this.sortAscending) {
        return (a.isComplete === b.isComplete) ? 0 : a.isComplete ? -1 : 1;
      } else {
        return (a.isComplete === b.isComplete) ? 0 : a.isComplete ? 1 : -1;
      }
    });
    this.sortColumn = 'complete';
    this.todos = this.todos.slice();
  }

  sortByColumn(col: string): void {
    this.sortAscending = this.getSortDirection(col);
    this.todos.sort((a, b) => {
      if (this.sortAscending) {
        return (a[col] === b[col]) ? 0 : a[col] > b[col] ? -1 : 1;
      } else {
        return (a[col] === b[col]) ? 0 : a[col] > b[col] ? 1 : -1;
      }
    });
    this.sortColumn = col;
    this.todos = this.todos.slice();
  }

  getSortDirectionClass(col: string) {
    let sortClass: string;

    if (this.sortColumn === col) {
      sortClass = this.sortAscending ? 'fa-caret-up' : 'fa-caret-down';
    } else {
      sortClass = '';
    }

    return sortClass;
  }
}
