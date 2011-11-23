# Position collision event for jQuery UI

This script triggers *positioncollision* event when collision detection is in turned on, and collision occures. It's a work-in-progress, and currently requires developer to add one line to jQuery UI core to enable it to pass element down to position detection function.

# Usage

    $("#example").dialog({
        position: {
                        my: 'top',
                        at: 'bottom',
                        of: $("#wrapper"),
                        collision: 'flip'
                    }
    }).bind("positioncollision", function(e, prop) {
        console.log('position collision!');
    })

# License

Distributed under the MIT license.
