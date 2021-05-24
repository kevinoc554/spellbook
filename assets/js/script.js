$(document).ready(function () {
    // Trigger DataTables onload and sort by Level
    $('#spellListTable').DataTable({
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

    // Set background image of class icon divs by pulling text from spans
    $('.class-icon').each(function () {
        let classValue = $(this).next('span').text().toLowerCase();
        let backgroundUrl = `assets/images/${classValue}-icon.jpg`;
        $(this).css('background-image', "url(" + backgroundUrl + ")");
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

        $('#submitButton').html(`
        <button type="submit" id="submitButton" class="btn btn-secondary btn-sending hvr-fade">
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

        // Template ID may be changed for testing purposes. Correct ID is "template_1vpz1s8"
        emailjs.send("service_0mkicmg", "template_1vpz1s8", templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                // Clear inputs on success
                $('#contactName, #contactEmail, #contactMessage').val('');
                // Change to Sent button
                $('#submitButton').html(`
                <button type="submit" class="btn btn-secondary btn-sent hvr-fade">
                Sent! <i class="fas fa-check-circle"></i>
                </button>
                `)
            }, function (error) {
                console.log('FAILED...', error);
                // Change to Sending Failed button on error
                $('#submitButton').html(`
                <button type="submit" class="btn btn-secondary btn-send-failed hvr-fade">
                Sending failed <i class="fas fa-times-circle"></i>
                </button>
                `)
            });
    })
});


function getData(type, cb) {
    let xhr = new XMLHttpRequest;
    let baseUrl = 'https://www.dnd5eapi.co/api/';
    xhr.open('GET', baseUrl + 'classes/' + type + '/spells');
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let testData = JSON.parse(this.responseText);
            cb(testData);
        }
    }
};

function writeClassListToDocument(type) {
    getData(type, function (data) {
        $('#api-test-div').html(`
        <p>Count: ${data.count}</p>
        `)
    })
};

// $('.class-icon').click(function () {
//     let type = $(this).next('span').text().toLowerCase();
//     writeClassListToDocument(type);
// })

// $('.class-link').click(function () {
//     let type = $(".class-link > span").text().toLowerCase();
//     writeClassListToDocument(type);
// });

$('.class-link').click(function () {
    let type = $(this).children("span").text().toLowerCase();
    writeClassListToDocument(type);
});