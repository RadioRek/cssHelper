class Item {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}

class Inventario {
    constructor() {
        this.items = [];
    }

    agregarItem(item) {
        this.items.push(item);
    }
}

class Arma extends Item {
    constructor(nombre, descripcion, tipo, modificadorDaño) {
        super(nombre, descripcion);
        this.tipo = tipo;
        this.modificadorDaño = modificadorDaño;
    }

    equiparArma(entidad) {
        entidad.arma = this;
        if (this.tipo === "fisica") {
            entidad.fuerza = entidad.fuerza + this.modificadorDaño;
        }
        else if (this.tipo === "magica") {
            entidad.inteligencia = entidad.inteligencia + this.modificadorDaño;
        }
    }

    desequiparArma(entidad) {
        if (this.tipo === "fisica") {
            entidad.fuerza = entidad.fuerza - this.modificadorDaño;
        }
        else if (this.tipo === "magica") {
            entidad.inteligencia = entidad.inteligencia - this.modificadorDaño;
        }
        entidad.arma = null;
    }
}

class Armadura extends Item {
    constructor(nombre, descripcion, modificadorDefensa) {
        super(nombre, descripcion);
        this.modificadorDefensa = modificadorDefensa;
    }

    equiparArmadura(entidad) {
        entidad.armadura = this;
        entidad.resistencia = entidad.resistencia + this.modificadorDefensa;
    }

    desequiparArmadura(entidad) {
        entidad.resistencia = entidad.resistencia - this.modificadorDefensa;
        entidad.armadura = null;
    }
}

class Entidad {
    constructor(nombre, saludActual, saludMaxima, magiaActual, magiaMaxima, inventario, fuerza, inteligencia, resistencia, arma, armadura, habilidades) {
        this.nombre = nombre;
        this.saludActual = saludActual;
        this.saludMaxima = saludMaxima;
        this.magiaActual = magiaActual;
        this.magiaMaxima = magiaMaxima;
        this.inventario = inventario;
        this.fuerza = fuerza;
        this.inteligencia = inteligencia;
        this.resistencia = resistencia;
        this.habilidades = habilidades;
        arma.equiparArma(this);
        armadura.equiparArmadura(this);
    }

    toString() {
        return `${this.nombre} - Salud: ${this.saludActual}/${this.saludMaxima}, Magia: ${this.magiaActual}/${this.magiaMaxima}, Fuerza: ${this.fuerza}, Inteligencia: ${this.inteligencia}, Resistencia: ${this.resistencia}`;
    }
}

class Habilidad {
    constructor(nombre, descripcion, costoMagia, usar) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.costoMagia = costoMagia;
        this.usar = usar;
    }
}

class Jugador extends Entidad {
    constructor(nombre, saludActual, saludMaxima, magiaActual, magiaMaxima, inventario, fuerza, inteligencia, resistencia, arma, armadura, nivel, experiencia, experienciaSiguienteNivel, habilidades) {
        super(nombre, saludActual, saludMaxima, magiaActual, magiaMaxima, inventario, fuerza, inteligencia, resistencia, arma, armadura, habilidades);
        this.nivel = nivel;
        this.experiencia = experiencia;
        this.experienciaSiguienteNivel = experienciaSiguienteNivel;
    }


    toString() {
        return `${super.toString()}, Nivel: ${this.nivel}, Experiencia: ${this.experiencia}/${this.experienciaSiguienteNivel}`;
    }
}

class Enemigo extends Entidad {
    constructor(nombre, saludActual, saludMaxima, magiaActual, magiaMaxima, inventario, fuerza, inteligencia, resistencia, arma, armadura, nivel, experienciaRecompensa, habilidades) {
        super(nombre, saludActual, saludMaxima, magiaActual, magiaMaxima, inventario, fuerza, inteligencia, resistencia, arma, armadura, habilidades);
        this.nivel = nivel;
        this.experienciaRecompensa = experienciaRecompensa;
    }

    toString() {
        return `${super.toString()}, Nivel: ${this.nivel}, Experiencia Recompensa: ${this.experienciaRecompensa}`;
    }
}


class Encuentro {
    constructor(enemigo, texto) {
        this.enemigo = enemigo;
        this.texto = texto;
    }
}


let espadaGoblin = new Arma("Espada de Goblin", "Una espada oxidada utilizada por goblins.", 5);
let haraposSucios = new Armadura("Harapos Sucios", "Ropa desgastada que ofrece poca protección.", 2);

let goblin = new Enemigo(
    "Goblin", // nombre
    30, // saludActual
    30, // saludMaxima
    10, // magiaActual
    10, // magiaMaxima
    new Inventario(), // inventario
    5, // fuerza
    2, // inteligencia
    3, // resistencia
    espadaGoblin, // arma
    haraposSucios, // armadura
    1, // nivel
    20, // experienciaRecompensa
    [] // habilidades
);

let textoEncuentroGoblin = "La siguiente habitación está oscura y huele a humedad. De repente, un goblin salta desde las sombras, blandiendo su espada oxidada y gruñendo con hostilidad.";

let encuentroGoblin = new Encuentro(goblin, textoEncuentroGoblin);

let encuentroNadie = new Encuentro(null, "No hay nada de interés aquí.");

mapa = [
    [encuentroNadie, encuentroNadie, encuentroNadie],
    [encuentroNadie, encuentroGoblin, encuentroNadie],
    [encuentroGoblin, encuentroNadie, encuentroGoblin]
]

let posicionJugador = { x: 0, y: 0 };
let encuentroActual = mapa[posicionJugador.y][posicionJugador.x];

function moverJugador(direccion) {
    if (direccion === "arriba" && posicionJugador.y > 0) {
        posicionJugador.y = posicionJugador.y - 1;
    } else if (direccion === "abajo" && posicionJugador.y < mapa.length - 1) {
        posicionJugador.y = posicionJugador.y + 1;
    } else if (direccion === "izquierda" && posicionJugador.x > 0) {
        posicionJugador.x = posicionJugador.x - 1;
    } else if (direccion === "derecha" && posicionJugador.x < mapa[0].length - 1) {
        posicionJugador.x = posicionJugador.x + 1;
    } else {
        console.log("Movimiento inválido.");
        return;
    }
}

let espadaBasica = new Arma("Espada Básica", "Una espada simple pero confiable.", "fisica", 5);
let armaduraBasica = new Armadura("Armadura Básica", "Armadura ligera que ofrece protección básica.", 3);

let jugador = new Jugador(
    "Heroe", // nombre
    100, // saludActual
    100, // saludMaxima
    50, // magiaActual
    50, // magiaMaxima
    new Inventario(), // inventario
    10, // fuerza
    10, // inteligencia
    5, // resistencia
    espadaBasica, // arma
    armaduraBasica, // armadura
    1, // nivel
    0, // experiencia
    100, // experienciaSiguienteNivel
    [] // habilidades
);


function updateDisplay() {

    let contenedorTexto = document.querySelector(".contenedorTexto");
    let elementoJugador = document.getElementById("elementoJugador");
    let elementoPosicion = document.getElementById("elementoPosicion");
    let elementoEnemigo = document.getElementById("elementoEnemigo");
    contenedorTexto.innerHTML = "";

    contenedorTexto.innerHTML = encuentroActual.texto;
    elementoJugador.innerHTML = jugador.toString();
    elementoPosicion.innerHTML = `Posición: (${posicionJugador.x}, ${posicionJugador.y})`;
    if (encuentroActual.enemigo) {
        elementoEnemigo.innerHTML = encuentroActual.enemigo.toString();
    } else {
        elementoEnemigo.innerHTML = "No hay enemigo presente.";
    }
}




updateDisplay();

let formularioMovimiento = document.getElementById("movimiento");

formularioMovimiento.addEventListener("submit", function (event) {
    event.preventDefault();

    let inputDireccion = document.getElementById("inputDireccion");
    let direccion = inputDireccion.value.toLowerCase();
    moverJugador(direccion);
    encuentroActual = mapa[posicionJugador.y][posicionJugador.x];
    updateDisplay();
});