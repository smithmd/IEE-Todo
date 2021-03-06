import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoComponent} from './todo/todo.component';
import {ShowCompleteTasksPipe} from './show-complete-tasks.pipe';
import {TodoControlsComponent} from './todo-controls/todo-controls.component';
import {TodoListDataService} from './todo-list-data.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoComponent,
    ShowCompleteTasksPipe,
    TodoControlsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [TodoListDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
