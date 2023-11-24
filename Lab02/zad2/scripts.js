function validateNumber(phone) {
    var cleanPhone = phone.replace(/\s+/g, ''); //Usuwa spacje
    var phoneRegex = /^(\+\d{11}|\d{9})$/; //Dopasowanie numeru telefonu
    return phoneRegex.test(cleanPhone); //True -poprawny False - niepoprawny
}

function validateName(name) {
    var nameRegex = /^[A-Z][a-z-]+(?: [A-Z][a-z-]+)+$/;
    return nameRegex.test(name); //true - poprawne imie False - niepoprawne
}

function addEntry() {
    var name = document.getElementById('nameInput').value.trim(); 
    var number = document.getElementById('phoneInput').value.trim();


    if (!validateName(name)) {
        alert('Niepoprawna nazwa - nie używaj znaków specjalnych, imię i nazwisko musi rozpoczynać się z dużej litery.');
        return;
    }
    if (!validateNumber(number)) {
        alert('Dopuszczalne jest 9 albo 11 cyfr.');
        return;
    }

    var entry = document.createElement('div'); 
    entry.className = 'entry';
    entry.innerHTML = `<span>${name}<br><br>${number}</span><button id="delete-button" onclick="removeEntry(this)"><img src="trash-solid.svg" style="width: 15px;"></button>`;

    document.getElementById('phonebook-entries').appendChild(entry);

    //Czyścimy inputy
    document.getElementById('nameInput').value = '';
    document.getElementById('phoneInput').value = '';
}


    function removeEntry(button) {
    button.parentElement.remove();
}

document.getElementById('add-button').addEventListener('click', addEntry); //Na kliknięcie addEntry()