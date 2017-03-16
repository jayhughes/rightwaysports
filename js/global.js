function setHeight() {
    var bgLanding = $(".bg"), nav = $("nav").outerHeight(), hero = $(".full-size");
    hero.css({
        height: $(window).innerHeight() - nav
    }), bgLanding.css({
        height: $(window).innerHeight()
    });
}

$(function() {
    $("#tabs").tabs();
});

// Private
var common = function(document) {
    var docElem = document.documentElement, _userAgentInit = function() {
        docElem.setAttribute("data-useragent", navigator.userAgent), $("#search").focus(function() {
            $(this).attr("placeholder", "");
        }).blur(function() {
            $(this).attr("placeholder", "Search...");
        });
    }, dateRange = function() {
        $("#dayOfWeekOne").datepicker({
            dateFormat: "dd/mm/yy",
            minDate: new Date(2017, 4, 3),
            maxDate: new Date(2017, 4, 7)
        });
    }, selectChange = function() {
        $(".pass-options").each(function() {
            var $thisDayOption = $(this).parent().find(".day-option");
            $(this).on("change", function() {
                "Day Pass" === $(this).find("option:selected").val() ? $thisDayOption.show() : ($thisDayOption.hide(), 
                $(this).find(".dayOfWeekInput").val(""));
            });
        });
    }, submitToPayPal = function() {
        function getInputsText() {
            console.log($textArea), $textArea.val($inputs.map(function() {
                return $(this).attr("name") + ": " + $(this).val();
            }).get().join("; ")), $inputs.prop("disabled", !0);
        }
        var $inputs = $(".disabled"), $textArea = $(".hide-text-area"), $form = ($("button.pay"), 
        $(".payment"));
        $form.each(function() {
            $(this).validate({
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
                    console.log(getInputsText());
                }
            });
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