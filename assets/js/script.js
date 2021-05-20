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

    // EmailJS
    $('#formTrigger').submit(function (event) {
        event.preventDefault();

        $('#submit-button').html(`
        <button type="submit" id="submit-button" class="btn btn-secondary btn-sending hvr-fade">
        Sending... <img src="assets/images/loading.gif" alt="sending..." height="21" width="21">
        </button>
        `)

        let fromName = $('#contactName').val();
        let fromEmail = $('#contactEmail').val();
        let fromMessage = $('#contactMessage').val();
        let templateParams = {
            from_name: fromName,
            from_email: fromEmail,
            message: fromMessage
        }

        // Template ID changed for testing purposes. Correct ID is "template_1vpz1s8"
        emailjs.send("service_0mkicmg", "template_1vpz1s", templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
                $('#submit-button').html(`
                <button type="submit" class="btn btn-secondary btn-send-failed hvr-fade">
                Sending failed <i class="fas fa-times-circle"></i>
                </button>
                `)
            });
    })
});