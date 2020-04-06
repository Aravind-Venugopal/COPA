(function ($) {
    if (typeof $.telligent === 'undefined')
        $.telligent = {};

    if (typeof $.telligent.analytics === 'undefined')
        $.telligent.analytics = {};

    if (typeof $.telligent.analytics.widgets === 'undefined')
        $.telligent.analytics.widgets = {};

    $.telligent.analytics.turnItOff = function (id) {
        var el = document.getElementById(id);
        el.style.display = "none";
    };

    $.telligent.analytics.turnItOn = function (id) {
        var el = document.getElementById(id);
        el.style.display = "block";
    };

    $.telligent.analytics.setCookie = function (key, value) {
        var myCookie = key + "=" + value;
        var expireDate = new Date();
        expireDate.setTime(expireDate.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = myCookie + "; expires=" + expireDate + '; path=/';
    };

    $.telligent.analytics.isValidDateRange = function (startDateId, endDateId) {
        var startDate = $("#" + startDateId).glowDateTimeSelector('val');
        var endDate = $("#" + endDateId).glowDateTimeSelector('val');
        return (startDate <= endDate);
    };

    $.telligent.analytics.highlightInvalidDates = function (startDateId, endDateId) {
        $("#" + startDateId).addClass("date-invalid");
        $("#" + endDateId).addClass("date-invalid");
    };

    $.telligent.analytics.clearInvalidDates = function (dateId1, dateId2) {
        $("#" + dateId1).removeClass("date-invalid");
        $("#" + dateId2).removeClass("date-invalid");
    };

    $.telligent.analytics.onDateChange = function (args) {
        $.telligent.analytics.clearInvalidDates(args.startDateId, args.endDateId);
        if ($.telligent.analytics.isValidDateRange(args.startDateId, args.endDateId)) {
            setDateCookies(args);
            args.refresh();
        } else {
            $.telligent.analytics.highlightInvalidDates(args.startDateId, args.endDateId);
        }
        $("#" + args.resetButtonId).show();
    };

    $.telligent.analytics.cookieExists = function (cookieName) {
        return (document.cookie.indexOf(cookieName) != -1);
    };

    $.telligent.analytics.deleteCookie = function (key) {
        var myCookie = key + "=";
        var expireDate = "Thu, 01-Jan-1970 00:00:01 GMT"
        document.cookie = myCookie + "; expires=" + expireDate + '; path=/';
    };

    $.telligent.analytics.clearCookies = function(args) {
        $.telligent.analytics.deleteCookie(args.startDate + '_Day');
        $.telligent.analytics.deleteCookie(args.startDate + '_Month');
        $.telligent.analytics.deleteCookie(args.startDate + '_Year');
        $.telligent.analytics.deleteCookie(args.endDate + '_Day');
        $.telligent.analytics.deleteCookie(args.endDate + '_Month');
        $.telligent.analytics.deleteCookie(args.endDate + '_Year');
    }

    var setDateCookies = function (args) {
        var selectedStartDate = $("#" + args.startDateId).glowDateTimeSelector('val');
        var selectedEnddate = $("#" + args.endDateId).glowDateTimeSelector('val');
        var startDay = selectedStartDate.getDate();
        var startMonth = selectedStartDate.getMonth() + 1;
        var startYear = selectedStartDate.getFullYear();
        var endDay = selectedEnddate.getDate();
        var endMonth = selectedEnddate.getMonth() + 1;
        var endYear = selectedEnddate.getFullYear();
        $.telligent.analytics.setCookie(args.cookieStartDate + '_Day', startDay);
        $.telligent.analytics.setCookie(args.cookieStartDate + '_Month', startMonth);
        $.telligent.analytics.setCookie(args.cookieStartDate + '_Year', startYear);
        $.telligent.analytics.setCookie(args.cookieEndDate + '_Day', endDay);
        $.telligent.analytics.setCookie(args.cookieEndDate + '_Month', endMonth);
        $.telligent.analytics.setCookie(args.cookieEndDate + '_Year', endYear);
    };
})(jQuery);
