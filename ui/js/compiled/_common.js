function setHeight() {

    var bgLanding = $(".bg"),
        nav = $('nav').outerHeight(),
        hero = $('.full-size');

    hero.css({
        height: $(window).innerHeight() - nav
    });

    bgLanding.css({
        height: $(window).innerHeight()
    });
}


$( function() {
    $("#tabs").tabs();
});


// Private

var common = (function(document) {

    var validated;
    var docElem = document.documentElement,

    _userAgentInit = function() {
        docElem.setAttribute('data-useragent', navigator.userAgent);

        $('#search').focus(function() {
            $(this).attr('placeholder', '');
        }).blur(function() {
            $(this).attr('placeholder', 'Search...');
        });
    },

    dateRange = function() {
        $("#dayOfWeekOne").datepicker({
            dateFormat:'dd/mm/yy', 
            minDate: new Date(2017,04,3),
            maxDate: new Date(2017,04,7)
        });

        // $("#dayOfWeekTwo").datepicker({
        //     dateFormat:'dd/mm/yy', 
        //     minDate: new Date(2017,04,10),
        //     maxDate: new Date(2017,04,13)
        // });
    },

    selectChange = function() {
        $('.pass-options').each(function() {
            var $thisDayOption = $(this).parent().find('.day-option');
            $(this).on('change', function() {
                if($(this).find('option:selected').val() === 'Day Pass') {
                    $thisDayOption.show();
                }
                else {
                    $thisDayOption.hide();
                    $(this).find('.dayOfWeekInput').val('');
                }
            });
        });
    },

    submitToPayPal = function() {

        var $inputs = $('.disabled');
        var $textArea = $('.hide-text-area');
        var $button = $('button.pay');
        var $form = $('.payment');
        var isValid;

        function getInputsText() {
            console.log($textArea);
            $textArea.val(
                $inputs.map(function() {
                    return $(this).attr('name') + ': ' + $(this).val();
                })
                .get()
                .join('; ')
            );
            $inputs.prop('disabled', true);
        }
            
        $form.each(function() {
            $(this).validate({
                ignore: ".hide-text-area",
                rules: {
                    childName: "required",
                    parentsName: "required",
                    phoneNumber: "required",
                    email: {
                        required: true,
                        email: true
                    }
                },
                submitHandler: function(form) {
                    console.log(getInputsText());
                    // form.submit();
                }
            });
        });
       
    },

    _init = function() {
        _userAgentInit();
        submitToPayPal();
        dateRange();
        selectChange();
    };

    return {
        init: _init
    };

})(document);