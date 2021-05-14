$(document).ready(function () {
    // Trigger DataTables onload and sort by Level
    $('#spell-list-table').DataTable({
        "order": [1, 'asc'],
        "info": false,
        "paging": false
    });

    // Offcanvas effect on navbar adapted from Bootstrap
    $('.navbar-toggler').click(function () {
        $('#navbarNav').toggleClass('open');
    });

    // Manual toggle to show/hide Instructions text
    // Toggles classes to change FA chevron
    $('#instructionsToggle').click(function () {
        $(this).toggleClass('fa-chevron-down');
        $(this).toggleClass('fa-chevron-up');
        $('#instructionsText').slideToggle();
    });

    // Manual toggle to show/hide Materials text
    $('#materialsListToggle').click(function () {
        $(this).toggleClass('fa-chevron-down');
        $(this).toggleClass('fa-chevron-up');
        $('#materialsText').slideToggle('fast');
    });

    // Manual toggle to show/hide Damages at higher levels text
    $('#damageListToggle').click(function () {
        $(this).toggleClass('fa-chevron-down');
        $(this).toggleClass('fa-chevron-up');
        $('#damagesText').slideToggle();
    });

    // Fade Return to Top button in and out
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('#toTopBtn').fadeIn();
        } else {
            $('#toTopBtn').fadeOut();
        }
    })

    // Smooth scroll to top when btn is clicked
    $('#toTopBtn').click(function () {
        $('html').animate({
            scrollTop: 0
        }, 1000);
    });
});