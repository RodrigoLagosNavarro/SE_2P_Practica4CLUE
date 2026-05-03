/* ========================= */
/* ===== DIÁLOGOS ========== */
/* ========================= */

const dialogos = [

    "JOHN: No me gusta este lugar...",

    "GINA: Hay una presencia aquí.",

    "RICHARD: Entramos rápido y salimos rápido.",

    "JOSEPH: Manténganse juntos.",

    "ANA: Siento que alguien nos observa..."

];

let dialogoActual = 0;

/* ========================= */
/* ===== VARIABLES ========= */
/* ========================= */

let habitacionesVisitadas = [];

let muerteActivada = false;

let cuerpoEncontrado = false;

let intentosFallidos = 0;

/* ========================= */
/* ===== RANDOM REAL ======= */
/* ========================= */

const personajes = [
    "JOHN",
    "GINA",
    "RICHARD",
    "JOSEPH",
    "ANA"
];

const armas = [
    "DAGA",
    "CRUCIFIJO",
    "HACHA",
    "CUERDA",
    "VELA"
];

const habitacionesCaso = [
    "Biblioteca",
    "Sótano",
    "Habitación",
    "Comedor",
    "Capilla"
];

/* RANDOM */

let asesino =
    personajes[Math.floor(Math.random() * personajes.length)];

let armaAsesinato =
    armas[Math.floor(Math.random() * armas.length)];

let lugarAsesinato =
    habitacionesCaso[
        Math.floor(Math.random() * habitacionesCaso.length)
    ];

/* VÍCTIMA */

let posiblesVictimas =
    personajes.filter(p => p !== asesino);

let victima =
    posiblesVictimas[
        Math.floor(Math.random() * posiblesVictimas.length)
    ];

/* LISTA DE MUERTOS */

const muertos = [victima];

/* DEBUG */

console.log("ASESINO:", asesino);
console.log("ARMA:", armaAsesinato);
console.log("LUGAR:", lugarAsesinato);
console.log("VICTIMA:", victima);

/* ========================= */
/* ===== PERSONAJES ======== */
/* ========================= */

const personajesHabitacion = {

    "BIBLIOTECA.png": {
        nombre: "GINA",
        imagen: "GINA.png"
    },

    "SOTANO.png": {
        nombre: "JOSEPH",
        imagen: "JOSEPH.png"
    },

    "HABITACION.png": {
        nombre: "ANA",
        imagen: "ANA.png"
    },

    "COMEDOR.png": {
        nombre: "RICHARD",
        imagen: "RICHARD.png"
    },

    "CAPILLA.png": {
        nombre: "JOHN",
        imagen: "JOHN.png"
    }

};

/* ========================= */
/* ===== PLAY ============== */
/* ========================= */

document.getElementById("playBtn")
.addEventListener("click", () => {

    document.getElementById("menu")
    .style.display = "none";

    document.getElementById("menu-background")
    .style.display = "none";

    document.getElementById("cinematica")
    .style.display = "block";

});

/* ========================= */
/* ===== TUTORIAL ========== */
/* ========================= */

document.getElementById("tutorialBtn")
.addEventListener("click", () => {

    document.getElementById("tutorial-screen")
    .style.display = "flex";

});

/* CERRAR */

document.getElementById("close-tutorial-btn")
.addEventListener("click", () => {

    document.getElementById("tutorial-screen")
    .style.display = "none";

});

/* ========================= */
/* ===== CINEMÁTICA ======== */
/* ========================= */

document.getElementById("dialogue-box")
.addEventListener("click", () => {

    dialogoActual++;

    if(dialogoActual >= dialogos.length){

        document.getElementById("cinematica")
        .style.display = "none";

        document.getElementById("game-screen")
        .style.display = "block";

        return;
    }

    actualizarDialogo();

});

function actualizarDialogo(){

    document.getElementById("dialogue-text")
    .innerText = dialogos[dialogoActual];

}

/* ========================= */
/* ===== BOTÓN IR ========= */
/* ========================= */

document.getElementById("irBtn")
.addEventListener("click", () => {

    document.getElementById("overlay")
    .style.display = "flex";

});

function cerrarOverlay(){

    document.getElementById("overlay")
    .style.display = "none";

}

/* ========================= */
/* ===== CAMBIAR ESCENA ==== */
/* ========================= */

function cambiarEscena(imagen){

    document.getElementById("game-background")
    .style.backgroundImage =
        `url('imagenes/${imagen}')`;

    cerrarOverlay();

    const personaje =
        personajesHabitacion[imagen];

    const sprite =
        document.getElementById("room-character");

    const arma =
        document.getElementById("weapon-object");

    sprite.style.display = "block";

    /* LIMPIAR CLASES */

    sprite.classList.remove(
        "alive-character",
        "dead-character"
    );

    /* CADÁVER */

    if(
        muertos.includes(personaje.nombre)
        && muerteActivada
    ){

        sprite.classList.add("dead-character");

        sprite.src =
            `imagenes/${personaje.nombre}_DEAD.png`;

        arma.src =
            `imagenes/${armaAsesinato}.png`;

        arma.style.display = "block";

    }

    else {

        sprite.classList.add("alive-character");

        sprite.src =
            `imagenes/${personaje.imagen}`;

        arma.style.display = "none";

    }

    /* VISITAS */

    if(!habitacionesVisitadas.includes(imagen)){

        habitacionesVisitadas.push(imagen);

    }

    /* ACTIVAR MUERTE */

    if(habitacionesVisitadas.length >= 4){

        activarMuerte();

    }

    /* ========================= */
    /* ===== BOTÓN ACUSAR ====== */
    /* ========================= */

    if(
        imagen === "CAPILLA.png" &&
        cuerpoEncontrado
    ){

        document.getElementById("accuse-open-btn")
        .style.display = "block";

    }

    else {

        document.getElementById("accuse-open-btn")
        .style.display = "none";

    }

}


/* ========================= */
/* ===== CLICK PERSONAJE === */
/* ========================= */

document.getElementById("room-character")
.addEventListener("click", () => {

    const fondo =
        document.getElementById("game-background")
        .style.backgroundImage;

    let actual = "";

    if(fondo.includes("BIBLIOTECA.png"))
        actual = "BIBLIOTECA.png";

    if(fondo.includes("SOTANO.png"))
        actual = "SOTANO.png";

    if(fondo.includes("HABITACION.png"))
        actual = "HABITACION.png";

    if(fondo.includes("COMEDOR.png"))
        actual = "COMEDOR.png";

    if(fondo.includes("CAPILLA.png"))
        actual = "CAPILLA.png";

    const personaje =
        personajesHabitacion[actual];

    /* ========================= */
    /* ===== CADÁVER ========= */
    /* ========================= */

    if(
        muerteActivada &&
        muertos.includes(personaje.nombre)
    ){

        if(!cuerpoEncontrado){

            cuerpoEncontrado = true;

            document.getElementById("clue-box")
            .innerText =
                `Has encontrado el cuerpo.\n\n${personaje.nombre} ha muerto.`;

            document.getElementById("objective-box")
            .innerText =
                "OBJETIVO: Encuentra pistas para descubrir al asesino.";

            return;

        }

        else {

            document.getElementById("clue-box")
            .innerText =
                "El cuerpo está frío...";

            return;

        }

    }

    /* ========================= */
    /* ===== DIÁLOGOS ========= */
    /* ========================= */

    if(!muerteActivada){

        document.getElementById("clue-box")
        .innerText =
            `${personaje.nombre}: Este lugar me da mala espina.`;

    }

    else {

        /* ASESINO */

        if(personaje.nombre === asesino){

            const sospechosos = [

                `${personaje.nombre}: Yo no hice nada.`,

                `${personaje.nombre}: ¿Por qué me miras así?`,

                `${personaje.nombre}: No deberíamos seguir aquí.`

            ];

            document.getElementById("clue-box")
            .innerText =
                sospechosos[
                    Math.floor(Math.random() * sospechosos.length)
                ];

        }

        /* INOCENTES */

        else {

            const inocentes = [

                `${personaje.nombre}: Escuché algo en ${lugarAsesinato}.`,

                `${personaje.nombre}: Creo que vi un ${armaAsesinato.toLowerCase()}.`,

                `${personaje.nombre}: Todo ocurrió demasiado rápido.`

            ];

            document.getElementById("clue-box")
            .innerText =
                inocentes[
                    Math.floor(Math.random() * inocentes.length)
                ];

        }

    }

});

/* ========================= */
/* ===== ACUSAR ============ */
/* ========================= */

document.getElementById("accuse-btn")
.addEventListener("click", () => {

    const sospechoso =
        document.getElementById("suspect-select").value;

    const arma =
        document.getElementById("weapon-select").value;

    const lugar =
        document.getElementById("room-select").value;

    /* ========================= */
    /* ===== VICTORIA ========= */
    /* ========================= */

    if(
        sospechoso === asesino &&
        arma === armaAsesinato &&
        lugar === lugarAsesinato
    ){

        document.getElementById("clue-box")
        .innerText =
            "HAS EXPULSADO AL ESPÍRITU.\n\nLa mansión ha sido purificada.";

        document.getElementById("objective-box")
        .innerText =
            "FINAL VERDADERO";

        document.getElementById("accusation-panel")
        .style.display = "none";

        return;

    }

    /* ========================= */
    /* ===== DERROTA ========== */
    /* ========================= */

    else {

        intentosFallidos++;

        document.getElementById("clue-box")
        .innerText =
            "TE HAS EQUIVOCADO.\n\nEl espíritu sigue aquí.";

        document.getElementById("objective-box")
        .innerText =
            `INTENTOS FALLIDOS: ${intentosFallidos}`;

        document.getElementById("accusation-panel")
        .style.display = "none";

        /* SEGUNDA MUERTE */

        if(intentosFallidos === 1){

            const vivos = personajes.filter(p =>
                p !== asesino &&
                !muertos.includes(p)
            );

            if(vivos.length > 0){

                const nuevaVictima =
                    vivos[
                        Math.floor(Math.random() * vivos.length)
                    ];

                victima = nuevaVictima;

                muertos.push(nuevaVictima);

                cuerpoEncontrado = false;

                document.getElementById("death-screen")
                .style.display = "flex";

                document.getElementById("death-text")
                .innerText =
                    "OTRO PERSONAJE HA MUERTO...";

                setTimeout(() => {

                    document.getElementById("death-screen")
                    .style.display = "none";

                    document.getElementById("objective-box")
                    .innerText =
                        "OBJETIVO: Encuentra el nuevo cuerpo.";

                }, 2500);

            }

        }

        /* GAME OVER */

        if(intentosFallidos >= 2){

            setTimeout(() => {

                document.getElementById("clue-box")
                .innerText =
                    "TODOS HAN MUERTO.\n\nLa mansión reclamó otra alma.";

                document.getElementById("objective-box")
                .innerText =
                    "FINAL MALO";

            }, 1500);

        }

    }

});

/* ========================= */
/* ===== CERRAR PANEL ====== */
/* ========================= */

document.getElementById("close-accusation")
.addEventListener("click", () => {

    document.getElementById("accusation-panel")
    .style.display = "none";

});

/* ========================= */
/* ===== ABRIR PANEL ======= */
/* ========================= */

document.getElementById("accuse-open-btn")
.addEventListener("click", () => {

    document.getElementById("accusation-panel")
    .style.display = "flex";

});

/* ========================= */
/* ===== MUERTE ============ */
/* ========================= */

function activarMuerte(){

    if(muerteActivada) return;

    muerteActivada = true;

    document.getElementById("death-screen")
    .style.display = "flex";

    setTimeout(() => {

        document.getElementById("death-screen")
        .style.display = "none";

        document.getElementById("objective-box")
        .innerText =
            "OBJETIVO: Encuentra el cuerpo.";

        /* ========================= */
        /* ===== RECARGAR ROOM ===== */
        /* ========================= */

        const fondo =
            document.getElementById("game-background")
            .style.backgroundImage;

        if(fondo.includes("BIBLIOTECA.png"))
            cambiarEscena("BIBLIOTECA.png");

        if(fondo.includes("SOTANO.png"))
            cambiarEscena("SOTANO.png");

        if(fondo.includes("HABITACION.png"))
            cambiarEscena("HABITACION.png");

        if(fondo.includes("COMEDOR.png"))
            cambiarEscena("COMEDOR.png");

        if(fondo.includes("CAPILLA.png"))
            cambiarEscena("CAPILLA.png");

    }, 2500);

}