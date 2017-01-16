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
        $("#dayOfWeek").datepicker({
            dateFormat:'dd/mm/yy', 
            minDate: new Date(2017,01,13),
            maxDate: new Date(2017,01,17)
        });
    },

    selectChange = function() {
        $('#pass-options').on('change', function() {
            if($('#pass-options option:selected').val() === 'Day Pass') {
                $('#day-option').show();
            }
            else {
                $('#day-option').hide();
                $('#dayOfWeek').val('');
            }
        });
    },

    submitToPayPal = function() {

        var $inputs = $('.disabled');
        var $textArea = $('.hide-text-area');
        var $button = $('button.pay');
        var $form = $('#payment');
        var isValid;

        function getInputsText() {
            $textArea.val(
                $inputs.map(function() {
                    return $(this).attr('name') + ': ' + $(this).val();
                })
                .get()
                .join('; ')
            );
            $inputs.prop('disabled', true);
        }
            
        $form.validate({
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
                getInputsText();
                form.submit();
            }
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