(function($) {
    if (!$.ui || !$.ui.position) {
        throw "jQuery.ui or jQuery.ui.position doesn't exist!"
    }

    var original_ui_position = $.ui.position,
        wrapped_ui_position = {},
        positionChanged = function(position, originalPosition) {            
            return (position.left != originalPosition.left || position.top != originalPosition.top);
        },
        getPositionCopy = function(position) {
            return {
                top: position.top,
                left: position.left
            }
        },
        triggerColissionDetected = function(element, prop) {
            // trigger position collision event
            $(element).trigger('positioncollision', [prop])
        };

    for (prop in original_ui_position) {
        prop_value = original_ui_position[prop];
        if (original_ui_position.hasOwnProperty(prop) &&
            typeof(prop_value) == 'object' && prop_value.hasOwnProperty('left') && prop_value.hasOwnProperty('top')
        ) {
            wrapped_ui_position[prop] = {
                left: function(position, data) {
                    var originalPosition = getPositionCopy(position);
                    // call original UI position handler
                    original_ui_position[prop].left.call(this, position, data);
                    if (positionChanged(position, originalPosition)) {
                        triggerColissionDetected(data.elem, 'left');
                    }
                },
                top: function(position, data) {
                    var originalPosition = getPositionCopy(position);
                    // call original UI position handler
                    original_ui_position[prop].top.call(this, position, data);
                    if (positionChanged(position, originalPosition)) {
                        triggerColissionDetected(data.elem, 'top');
                    }
                }
            }
        }
    }

    // replace original $.ui.position object with wrapped version that triggers positioncollision event when applicable
    $.ui.position = wrapped_ui_position;

})(jQuery)
