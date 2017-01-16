function setHeight() {
    var bgLanding = $(".bg"), nav = $("nav").outerHeight(), hero = $(".full-size");
    hero.css({
        height: $(window).innerHeight() - nav
    }), bgLanding.css({
        height: $(window).innerHeight()
    });
}

// Private
var common = function(document) {
    var docElem = document.documentElement, _userAgentInit = function() {
        docElem.setAttribute("data-useragent", navigator.userAgent), $("#search").focus(function() {
            $(this).attr("placeholder", "");
        }).blur(function() {
            $(this).attr("placeholder", "Search...");
        });
    }, dateRange = function() {
        $("#dayOfWeek").datepicker({
            dateFormat: "dd/mm/yy",
            minDate: new Date(2017, 1, 13),
            maxDate: new Date(2017, 1, 17)
        });
    }, selectChange = function() {
        $("#pass-options").on("change", function() {
            "Day Pass" === $("#pass-options option:selected").val() ? $("#day-option").show() : ($("#day-option").hide(), 
            $("#dayOfWeek").val(""));
        });
    }, submitToPayPal = function() {
        function getInputsText() {
            $textArea.val($inputs.map(function() {
                return $(this).attr("name") + ": " + $(this).val();
            }).get().join("; ")), $inputs.prop("disabled", !0);
        }
        var $inputs = $(".disabled"), $textArea = $(".hide-text-area"), $form = ($("button.pay"), 
        $("#payment"));
        $form.validate({
            ignore: ".hide-text-area",
            rules: {
                childName: "required",
                parentsName: "required",
                phoneNumber: "required",
                email: {
                    required: !0,
                    email: !0
                }
            },
            submitHandler: function(form) {
                getInputsText(), form.submit();
            }
        });
    }, _init = function() {
        _userAgentInit(), submitToPayPal(), dateRange(), selectChange();
    };
    return {
        init: _init
    };
}(document);

$(function() {
    common.init();
}), $(document).foundation(), new WOW().init();