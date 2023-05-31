$(document).ready(function() {
    var redactCheckbox = $('#id_redact');
    var maskCheckboxContainer = $('#mask-checkbox-container');

    // Show/hide the "Mask" checkbox based on the "Redact" checkbox state
    redactCheckbox.change(function() {
        if (redactCheckbox.is(':checked')) {
            maskCheckboxContainer.show();
        } else {
            maskCheckboxContainer.hide();
        }
    });
});

# TODO check if this is OfflineAudioCompletionEvent. Try and make it work
