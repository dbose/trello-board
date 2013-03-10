jQuery(document).ready(function() {

    jQuery('.task_card').draggable({
        //appendTo: 'body',
        //containment: 'window',
        //scroll: false,
        helper: 'clone',
        revert: 'invalid',
        start: function(){
            jQuery(this).hide();
        },
        stop: function(){
            jQuery(this).show();
        }
    });

    jQuery('.task_card_container').droppable({
        accept: '.task_card',
        drop: function(e, ui) {

            // Get the task card that was dropped here
            var task_card = ui.draggable;

            // Get source swim lane
            var source_swim_lane = task_card.parents('.swim_lane');

            // Get the swim-lane
            var swim_lane = jQuery(this).parents('.swim_lane');

            // We shouldn't change status-code (because of improper mapping of swim_lane name => status codes)
            // if we' are in a same swim lane
            var should_change_status = (source_swim_lane.data('id') !== swim_lane.data('id'));

            if (should_change_status) {

                // Get target swim-lane status code
                var target_swim_lane_status_code = swim_lane.data('id');

                // Get corresponding task path
                var task_path = task_card.data('project-task-path');

                // Ideally we should do this after success
                //
                // Append the card to old/new swim-lane
                jQuery(this).append(task_card);

                jQuery.ajax({
                      url: task_path,
                      type: "PUT",
                      data: {
                                "task[status]" : target_swim_lane_status_code
                      },
                      dataType: "html"
                    })
                    .done(function(msg) {
                    })
                    .fail(function(jqXHR, textStatus) {
                    });

            }

        }
    });

});