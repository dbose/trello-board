trello-board
============

A simple drag and drop task card app like Trello (This has been extracted from [www.goachiev.com](www.goachiev.com))

![Task Board](https://dl.dropbox.com/u/27153018/trello-board-1.png)

The details of Project/TaskList/Task structure is not shown, as ther are hundreds of rails app for that. I recommend [Teambox](https://github.com/teambox/teambox) for that. 

Implementation
--

- **_task_card.html.haml** shows the basic task card markup
- **show_task_board_view.html.haml** creates the layout of the swimlanes and task-cards within the lanes. `task_status_code` is a helper method which returns the status code, given the symbol.
- **_task_board_view.sass** styles the cards and swimlanes. Yellow looks good. Isn't it?
- Simply add a member route to `projects` resource -
    <br>
    `get :task_board_view`
- Controller action is implemented as follows (assuming `@current_project` denotes the current project for which task-board view is sought, path is type of `/projects/:id/task_board_view`)

        def task_board_view
            authorize! :update, @current_project
            @backlogs = @current_project.tasks.backlog
            @active_tasks = @current_project.tasks.active
            @archived_tasks = @current_project.tasks.archived
            render :action => 'show_task_board_view'
        end
- **task_card.js** implements the jQuery drag-and-drop interface. When a card is dropped to a different swimlane than original, a AJAX request is initiated updating the status of the relevant task. Here we assume the presence of a field `status` which holds the status code for the task.
