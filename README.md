trello-board
============

A simple drag and drop task card app like Trello

![Task Board](https://dl.dropbox.com/u/27153018/trello-board-1.png)

The details of Project/TaskList/Task structure is not shown, as ther are hundreds of rails app for that. I recommend [Teambox](https://github.com/teambox/teambox) for that. 

Implementation
--

- _task_card.html.haml shows the basic task card markup
- show_task_board_view.html.haml creates the layout of the swimlanes and task-cards within the lanes.
- _task_board_view.sass styles the cards and swimlanes. Yellow looks good. Isn't it?
- Simply add a member route like 
    `get :task_board_view`
- Controller action is implemented as follows (assuming `@current_project` denotes the current project for which task-board view is sought, path is type of `/projects/:id/task_board_view`) 

    def task_board_view
        authorize! :update, @current_project
        @backlogs = @current_project.tasks.backlog
        @active_tasks = @current_project.tasks.active
        @archived_tasks = @current_project.tasks.archived
        render :action => 'show_task_board_view'
    end
