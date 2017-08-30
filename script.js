var isAdvanceUpload = function() {
    var div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
};
$(function() {
    var form = $('.box'),
        box__input = $('.box__input'),
        box__error = $('.box__error'),
        box__success = $('.box__success'),
        errorMsg = box__error.find('span'),
        input = form.find('input[type="file"]'),
        label = form.find('label'),
        showFiles = function(files) {
            box__input.removeClass('uk-background-muted');
            $('.box__error').addClass('uk-hidden');
            errorMsg.empty();
            label.text(files.length > 1 ? (input.attr('data-multiple-caption') || '').replace('{count}', files.length) : files[0].name);
        };
    if (isAdvanceUpload) {
        var droppedFiles = false;
        form.addClass('uk-placeholder uk-text-center ')
            .find('span').removeClass('uk-hidden');

        form.on('drag dragstart dragend dragover dragenter dragleave drop', function(event) {
            event.preventDefault();
            event.stopPropagation();

        }).on('dragover dragenter', function() {
            form.addClass('uk-background-muted');
            console.log('is dragover dragenter');

        }).on('dragleave dragend drop', function() {
            console.log('is dragleave dragend drop');
            form.removeClass('uk-background-muted');

        }).on('drop', function(event) {

            droppedFiles = event.originalEvent.dataTransfer.files;
            showFiles(droppedFiles);
        }).on('change', function(event) {
            $('.box__error').addClass('uk-hidden');
            // errorMsg.empty();
        }).on('submit', function(event) {
            if (form.hasClass('is-uploading')) {
                return false;
            } else {
                form.addClass('is-uploading').removeClass('is-error');
            }

            if (isAdvanceUpload) {
                event.preventDefault();
                var ajaxData = new FormData(form.get(0));
                if (droppedFiles) {
                    $.each(droppedFiles, function(i, file) {
                        ajaxData.append(input.attr('name'), file);
                    });
                }

                $.ajax({
                    url: form.attr('action'),
                    type: form.attr('method'),
                    dataType: 'json',
                    data: ajaxData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    complete: function() {
                        form.removeClass('is-uploading');
                    },
                    success: function(data) {
                        console.log(data.success);
                        box__input.addClass(data.success === true ? 'uk-invisible' : 'uk-background-muted');
                        if (!data.success) {
                            $('.box__error').removeClass('uk-hidden');
                            console.log(data.error);
                            console.log(errorMsg);
                            // errorMsg;
                            // $('.box__error span').text("WTF");
                            errorMsg.append('<pre>' + data.error + '</pre>');
                        }else{
                        box__success.removeClass('uk-hidden');
                            // errorMsg.append('<pre>' + data.error + '</pre>');
                            }

                    },
                    error: function(data) {
                        $('.box__error').removeClass('uk-hidden');
                        errorMsg.append('<pre>' + data.error + '</pre>');
                    }
                });
                input.on('change', function(event) {
                    showFiles(e.target.files);
                });
            }
        });


    }






});