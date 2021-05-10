// Trigger DataTables onload and sort by Level
$(document).ready( function () {
    $('#spell-list-table').DataTable({
        "order": [ 1, 'asc' ],
        "info": false,
        "paging": false
    });
} );

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