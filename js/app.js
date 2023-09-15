// Globales
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);

});

function buscarClima(e) {
    e.preventDefault();

    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        mostrarError('Ambos campos son obligatorios');

        return;
    }

    // Consultar la API
    consultarAPI(ciudad, pais);
}


function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    // Validando para que no se generen multiples alertas
    if (!alerta) {
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
    
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;
    
        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
    
}

function consultarAPI(ciudad, pais) {
    
    const appId = '1428aa38675d070379d9e369c447e742';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    // Mostrar el Spinner mientras hace la consulta a la API
    Spinner();

    fetch(url)
        .then( respuesta => respuesta.json())
        .then( datos => {

            limpiarHTML();

            if (datos === "404") {
                mostrarError('Ciudad no encontrada');
                return;
            }

            // En caso que este OK(202) Imprime el resultado en el DOM
            mostrarClima(datos);
        });

    // console.log(url);
}

function mostrarClima(datos) {
    // Deep desctructuring
    const { name, main: { temp, temp_max, temp_min } } = datos;
    // locales
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    // HTML ciudad
    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    // HTML actual
    const actual = document.createElement('p');
    actual.innerHTML = `Act: ${centigrados} &#8451`;
    actual.classList.add('font-bold', 'text-6xl');

    // HTML max
    const tempMax = document.createElement('p');
    tempMax.innerHTML = `Max: ${max} &#8451`;
    tempMax.classList.add('text-xl');

    // HTML min
    const tempMin = document.createElement('p');
    tempMin.innerHTML = `Max: ${min} &#8451`;
    tempMin.classList.add('text-xl');

    // Div con las temperaturas
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMax);
    resultadoDiv.appendChild(tempMin);

    // Agregando el resultado en el DOM
    resultado.appendChild(resultadoDiv);

    // console.log(temp - 273.15); // Pasando de Grados Kelvin a Centigrados
}

// Limpiando el resultado que figura
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// Helpers
const kelvinACentigrados = grados => parseInt(grados - 273.15);


// Spinner
function Spinner() {

    // Para limpiar cualquier registro previo
    limpiarHTML();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}