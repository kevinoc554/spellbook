//jshint esversion: 6

// Fetch last viewed spell list and spell data, write to DOM on load
// and highlight seleceted class and spell row
// If first visit, display first class and spell alphabetically
$(document).ready(function () {
    onFirstLoad();
    let firstClass = localStorage.getItem('class');
    let firstSpell = localStorage.getItem('spell');
    let hideInstructions = localStorage.getItem('hideInstructions');
    hideInstructionsOnLoad(hideInstructions);
    getSpellListTitle(firstClass);
    getClassData(firstClass);
    getSpellData(firstSpell);
    toggleActiveClassIcon(firstClass);
    setActiveRow(firstSpell);
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
$('#spellData').on('click', '#materialsListToggle', function () {
    $(this).toggleClass('fa-chevron-down');
    $(this).toggleClass('fa-chevron-up');
    $('#materialsText').slideToggle('fast');
});

// Manual toggle to show/hide Damages at higher levels text
$('#spellData').on('click', '#damageListToggle', function () {
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
});

// Smooth scroll to top when btn is clicked
$('#toTopBtn').click(function () {
    $('html').animate({
        scrollTop: 0
    }, 1000);
});

// EmailJS - emailjs is defined externally
$('#formTrigger').submit(function (event) {
    event.preventDefault();

    $('#submitButton').html(`
        <button type="submit" id="submitButton" class="btn btn-secondary btn-sending hvr-fade">
        Sending... <img src="assets/images/loading.gif" alt="sending..." height="21" width="21">
        </button>
        `);

    let fromName = $('#contactName').val();
    let fromEmail = $('#contactEmail').val();
    let fromMessage = $('#contactMessage').val();
    let templateParams = {
        from_name: fromName,
        from_email: fromEmail,
        message: fromMessage
    };

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
                `);
        }, function (error) {
            console.log('FAILED...', error);
            // Change to Sending Failed button on error
            $('#submitButton').html(`
                <button type="submit" class="btn btn-secondary btn-send-failed hvr-fade">
                Sending failed <i class="fas fa-times-circle"></i>
                </button>
                `);
        });
});


// Dnd API
const baseUrl = 'https://www.dnd5eapi.co/api/';

// Class Spell List - fetch and write data to DOM
function getClassData(type) {
    let classUrl = baseUrl + 'classes/' + type + '/spells';
    $.when(
        $.getJSON(classUrl)
    ).then(
        function (data) {
            // Log the selected class in local storage for future visits
            localStorage.setItem('class', type);
            if (data.count === 0) {
                let noSpells = `
                <p class="text-center">We do not currently have any spell info for this Class.</p>
                <p class="text-center">Please select another Class from the row above.</p>`;
                $('#spellListText').html(noSpells);
            } else {
                let spellList = data.results;
                let spellDiv = `
            <table class="table table-hover" id="spellListTable">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">Spell Name</th>
                    </tr>
                </thead>
                <tbody>`;
                $(spellList).each(function (i) {
                    spellDiv += `
                <tr>
                    <th scope="row" id="${this.index}" data-scroll="#spellData">${this.name}</th>
                </tr>`;
                });
                spellDiv += `
                </tbody>
            </table>`;
                $('#spellListText').html(spellDiv);
                $('#spellListTable').DataTable({
                    "info": false
                });
                // Fix issue with labels above table displaying incorrectly
                $('#spellListTable_length').parent().removeClass('col-md-6');
                $('#spellListTable_length').parent().addClass('col-lg-6');
            }
        });
}

// Click class icon to create class spell list table
$('.class-link').click(function () {
    let type = $(this).children("span").text().toLowerCase();
    toggleActiveClassIcon(type);
    getSpellListTitle(type);
    getClassData(type);
    scrollToDiv($(this));
});

// Create Spell List Title from Class Icon Span
function getSpellListTitle(type) {
    $('#spellListHeading').html(`
    <h2 class="text-center">Spell List</h2>
    <hr class="spell-hr">
    <h3 class="text-capitalize text-center spell-list-heading">${type} Spells:</h3>`);
}

// Spell Data - fetch and write data to DOM
function getSpellData(spellIndex) {
    let spellUrl = baseUrl + 'spells/' + spellIndex;
    $.when(
        $.getJSON(spellUrl)
    ).then(
        function (data) {
            // Log selected spell in local storage for next visit 
            localStorage.setItem('spell', spellIndex);
            // Hide instructions text on future visits as user has interacted with the site 
            localStorage.setItem('hideInstructions', 'yes');
            let spellDataBlock = `
            <div class="row">
                <div class="col-12">
                    <h2 class="text-center">Spell Info</h2>
                    <hr class="spell-hr">
                </div>
                <div class="col-12">
                    <h3 class="spell-name text-center">${data.name}</h3>
                </div>
                <div class="col-12 col-md-6">
                            <ul class="spell-trait-list list-unstyled">
                                <li><span class="font-weight-bold">Level:</span> ${data.level}</li>
                                <li><span class="font-weight-bold">School:</span> ${data.school.name}</li>
                                `;
            if (data.ritual) {
                spellDataBlock += `<li><span class="font-weight-bold">Ritual:</span> Yes</li>`;
            } else {
                spellDataBlock += `<li><span class="font-weight-bold">Ritual:</span> No</li>`;
            }
            if (data.concentration) {
                spellDataBlock += `<li><span class="font-weight-bold">Concentration:</span> Yes</li>`;
            } else {
                spellDataBlock += `<li><span class="font-weight-bold">Concentration:</span> No</li>`;
            }
            spellDataBlock += `
            <li>
                <span class="font-weight-bold">Components:</span>`;
            let spellComponents = data.components;
            $(spellComponents).each(function () {
                spellDataBlock += `<span class="components-span">${this}</span>`;
            });
            if (data.material) {
                spellDataBlock += `<p class="font-weight-bold">
                    Materials: <i id="materialsListToggle" class="fas fa-chevron-up pointer"></i>
                </p>
                <p id="materialsText" class="font-italic">${data.material}</p>
            `;
            }
            spellDataBlock += `
                        </li>        
                    </ul>
                </div>
            <div class="col-12 col-md-6">
                            <ul class="spell-trait-list list-unstyled">                                
                                <li><span class="font-weight-bold">Casting Time:</span> ${data.casting_time}</li>
                                <li><span class="font-weight-bold">Range:</span> ${data.range}</li>`;
            if (data.area_of_effect) {
                spellDataBlock += `
                <li><span class="font-weight-bold">Area of Effect:</span> ${data.area_of_effect.size}ft ${data.area_of_effect.type}</li>`;
            }
            if (data.dc) {
                spellDataBlock += `
                <li><span class="font-weight-bold">Save:</span> ${data.dc.dc_type.name}</li>`;
            }
            spellDataBlock += `<li><span class="font-weight-bold">Duration:</span> ${data.duration}</li>`;
            // If spell does damage
            if (data.damage) {
                spellDataBlock += `
                <li>
                        <span class="font-weight-bold">Damage:</span> ${data.damage.damage_type.name}`;
                // If cantrip/level 0
                if (data.damage.damage_at_character_level) {
                    spellDataBlock += `
                        <p class="font-weight-bold">Damage per character level: 
                            <i id="damageListToggle" class="fas fa-chevron-up pointer"></i>
                        </p>
                        <ol id="damagesText">
                            <li value="1">${data.damage.damage_at_character_level['1']}</li>
                            <li value="5">${data.damage.damage_at_character_level['5']}</li>
                            <li value="11">${data.damage.damage_at_character_level['11']}</li>
                            <li value="17">${data.damage.damage_at_character_level['17']}</li>`;
                } else {
                    // If regular levelled spell
                    spellDataBlock += `
                    <p class="font-weight-bold">Damage per spell level: 
                        <i id="damageListToggle" class="fas fa-chevron-up pointer"></i>
                    </p>
                    <ol id="damagesText" start="${data.level}">`;
                    let spellDamageObj = data.damage.damage_at_slot_level;
                    let spellDamageList = Object.values(spellDamageObj);
                    $(spellDamageList).each(function () {
                        spellDataBlock += `
                            <li>${this}</li>`;
                    });
                    spellDataBlock += `
                            </ol>
                        </li>`;
                }
            }
            spellDataBlock += `
                    </ul>
                </div>`;

            spellDataBlock += `<div class="col-12">
                <h4 class="font-weight-bold">Description</h4>`;

            let spellDesc = data.desc;
            $(spellDesc).each(function () {
                spellDataBlock += `<p>${this}</p>`;
            });

            if (data.higher_level) {
                spellDataBlock += `
                <h5 class="font-weight-bold">At Higher Levels:</h5>
                <p>${data.higher_level}</p>`;
            }
            spellDataBlock += `
            <p class="spell-data-classes">
                <span class="font-weight-bold">Classes:</span>`;
            let altClasses = data.classes;
            $(altClasses).each(function () {
                spellDataBlock += `
                <span class="pointer classes-span" id="${this.index}" data-scroll="#spellList">${this.name}</span>`;
            });
            spellDataBlock += `
            </p>
                </div>`;
            spellDataBlock += `</div>`;
            $('#spellData').html(spellDataBlock);
        }
    );
}

// Click spell name to request spell data from API
// Delegated event handler - event 'bubbles up' from th to #spellListText div
$('#spellListText').on('click', 'th', function () {
    let spellIndex = $(this).attr('id');
    getSpellData(spellIndex);
    toggleActiveSpell($(this));
    scrollToDiv($(this));
});

// Get a new Class list when Class spans in Spell Data are clicked
$('#spellData').on('click', '.classes-span', function () {
    let type = $(this).attr('id');
    getSpellListTitle(type);
    getClassData(type);
    toggleActiveClassIcon(type);
    scrollToDiv($(this));
});

// Toggle active class icon
function toggleActiveClassIcon(type) {
    $('#activeClassIcon').attr('id', '');
    $(`.class-icon-${type}`).parents('li').attr('id', 'activeClassIcon');
}

// Toggle active spell row in table
function toggleActiveSpell(thisObj) {
    $('.active-spell-row').removeClass('active-spell-row');
    thisObj.addClass('active-spell-row');
}

// Smooth scroll to spell list on class icon click
function scrollToDiv(thisObj) {
    let targetElement = thisObj.attr('data-scroll');
    let targetPosition = $(targetElement).offset();
    targetPosition.top -= 90;
    $('html, body').animate({
        scrollTop: targetPosition.top
    }, 750);
}

function hideInstructionsOnLoad(instructions) {
    if (instructions === 'yes') {
        $('#instructionsToggle').toggleClass('fa-chevron-down');
        $('#instructionsToggle').toggleClass('fa-chevron-up');
        $('#instructionsText').css('display', 'none');
    }

}

// set localStorage values on first load
function onFirstLoad() {
    if (localStorage.length < 1) {
        localStorage.setItem('class', 'bard');
        localStorage.setItem('spell', 'animal-friendship');
        localStorage.setItem('hideInstructions', 'no');
    }
}

// Set active spell row based on local storage
// Timeout delays function by 500ms to allow DataTables to complete rendering the table
function setActiveRow(spell) {
    setTimeout(function () {
        $('#' + spell).addClass('active-spell-row');
    }, 0.5 * 1000);
}