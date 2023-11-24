async function getData() { //Asynchroniczna funkcja do pobierania danych
    var res = await fetch("city.json"); //Wysłanie rządania
    var json = await res.json(); //Odczytanie jsona
    return json;
}

async function solveA(data) {
    const filtered = data.filter(function (entry) { //function zwraca true jeżeli province === małopolskie, filtered przechowuje miasta z małopolski
        return entry.province === "małopolskie";
    });

    var result = ""
    for (var p in filtered) {
        result += filtered[p].name + ", "
    }
    result = result.substr(0, result.length - 2); //usunięcie przecinka
    document.getElementById("a-answer").textContent = result;
}

function checkDoubleA(word) {
    var cnt = 0;
    for (var i = 0; i < word.length; i++) {
        letter = word.charAt(i)
        if (letter == 'A' || letter == 'a')
            cnt++;
        if (cnt == 2)
            break;
    }
    return cnt == 2
}

async function solveB(data) {
    
    var filtered = data.filter(function (entry) {
        return checkDoubleA(entry.name);
    });
    
    var cities = ""

    for (var prop in filtered) {
        if (!filtered.hasOwnProperty(prop)) {
            continue;
        }
        cities += filtered[prop].name + ", "
    }
    cities = cities.substr(0, cities.length - 2);
    cities = cities + "."
    document.getElementById("b-answer").textContent = cities;


}

async function solveC(data) {
    
    var citiesArray = new Array;
    for (var prop in data) {
        citiesArray.push([data[prop].name, data[prop].people / data[prop].area]);
    }
    citiesArray.sort(function (a, b) {
        if (a[1] < b[1])
            return 1
        else if (a[1] > b[1])
            return -1
        return 0
    });
    document.getElementById("c-answer").textContent = citiesArray[4][0];

}

async function solveD(data) {
   

    var filtered = data.filter(function (entry) {
        return entry.people > 100000;
    });
    var cities = ""
    for (var prop in filtered) {
        if (!filtered.hasOwnProperty(prop)) {
            continue;
        }
        cities += filtered[prop].name + " city, ";
    }
    cities = cities.substr(0, cities.length - 2) + "."

    document.getElementById("d-answer").textContent = cities;
}

async function solveE(data) {
    
    var cntMore = 0;
    var cntLess = 0;
    for (var prop in data) {
        if (data[prop].people > 80000)
            cntMore++;
        else
            cntLess++;
    }
    document.getElementById("e-answer1").textContent = "Miast powyżej 80000 mieszkańców jest: " + cntMore;
    document.getElementById("e-answer2").textContent = "Miast poniżej 80000 mieszkańców jest: " + cntLess;
    if (cntMore > cntLess) {
        document.getElementById("e-answer3").textContent = "Zatem: więcej jest miast powyżej 80k mieszkańców.";
    } else {
        document.getElementById("e-answer3").textContent = "Zatem: więcej jest miast poniżej 80k mieszkańców.";
    }

}

async function solveF(data) {
   
    var area_sum = 0;

    var citiesP = new Array;
    for (var prop in data) {
        if (data[prop].township.charAt(0) == 'P')
            citiesP.push([data[prop].area, data[prop].township]);
    }
    console.log(citiesP);
    citiesPstr = ""
    citiesP.forEach(element => {
        area_sum += element[0];
        citiesPstr += element[1] + ", "
    });
    citiesPstr = citiesPstr.substr(0, citiesPstr.length - 2) + "."
    document.getElementById("f-answer").textContent = area_sum / citiesP.length + " km^2";

}

function solveG(data) {
  
    const pomorskie = data.filter(city => city.province === "pomorskie"); //Tablica z miast z pomorskiego
    const numberOfPomorskie = data.filter(city => city.province === "pomorskie").length; // Liczba miast z pomorskiego
    const isEveryBigger = pomorskie.every(city => city.people > 5000); //Zwróci true jeżeli każde miasto z pomorskiego ma więcej niż 5000 osób
    const largerThan5000 = pomorskie.filter(city => city.people > 5000).length;
    const smallerOrEqual5000 = pomorskie.filter(city => city.people <= 5000).length;
    p = document.getElementById("g-answer"); 
  
    // ustawienie treści elementu paragrafu
    if (isEveryBigger) {
      p.textContent = "Tak, wszystkie miasta z województwa pomorskiego są większe od 5000 osób. Jest ich " + numberOfPomorskie;
    } else {
        p.textContent = "Nie. Nie wszystkie miasta z województwa pomorskiego mają więcej niż 5000 mieszkańców. Miast w których żyje więcej niż 5000 osób jest: " + largerThan5000 + ". Natomiast tych w których żyje mniej lub 5000 osób jest: " + smallerOrEqual5000;
    }

}

async function load() { //Funkcja ładująca dane na strone
    var json = await getData();
    solveA(json);
    solveB(json);
    solveC(json);
    solveD(json);
    solveE(json);
    solveF(json);
    solveG(json);
}

load();