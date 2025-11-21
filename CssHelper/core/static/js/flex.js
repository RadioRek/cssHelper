document.addEventListener("DOMContentLoaded", function () {
    let selectFlexDirection = document.getElementById("flex-direction");
    let selectJustifyContent = document.getElementById("justify-content");
    let selectAlignItems = document.getElementById("align-items");
    let selectFlexWrap = document.getElementById("flex-wrap");
    let selectAlignContent = document.getElementById("align-content");
    selectFlexDirection.addEventListener("change", aplicarEstilosContenedor);
    selectJustifyContent.addEventListener("change", aplicarEstilosContenedor);
    selectAlignItems.addEventListener("change", aplicarEstilosContenedor);
    selectFlexWrap.addEventListener("change", aplicarEstilosContenedor);
    selectAlignContent.addEventListener("change", aplicarEstilosContenedor);

    let inputTamañoHorizontal = document.getElementById("tamaño-horizontal");
    let inputTamañoVertical = document.getElementById("tamaño-vertical");
    inputTamañoHorizontal.addEventListener("input", cambiarTamañoContenedor);
    inputTamañoVertical.addEventListener("input", cambiarTamañoContenedor);

    let botonAgregarItem = document.getElementById("add-item");
    let botonQuitarItem = document.getElementById("remove-item");
    botonAgregarItem.addEventListener("click", agregarFlexItem);
    botonQuitarItem.addEventListener("click", quitarFlexItem);

    let selectFlexGrow = document.getElementById("flex-grow");
    let selectFlexShrink = document.getElementById("flex-shrink");
    let inputFlexBasis = document.getElementById("flex-basis");
    selectFlexGrow.addEventListener("change", aplicarEstilosItems);
    selectFlexShrink.addEventListener("change", aplicarEstilosItems);
    inputFlexBasis.addEventListener("input", aplicarEstilosItems);


    let flexContainer1 = document.getElementById("flex-container-1");

    let coloresCajas = ["#F25912", "#5C3E94", "#412B6B", "#211832", "#415E72", "#17313E"];

    function agregarFlexItem() {
        let flexItems1 = flexContainer1.getElementsByClassName("flex1-item");

        let newItem = document.createElement("div");
        newItem.className = "flex1-item";
        newItem.classList.add("item" + (flexItems1.length + 1));
        newItem.textContent = "Item " + (flexItems1.length + 1);

        // Color cíclico
        let colorIndex = flexItems1.length % coloresCajas.length;
        newItem.style.backgroundColor = coloresCajas[colorIndex];

        flexContainer1.appendChild(newItem);
        aplicarEstilosItems();
    }

    function quitarFlexItem() {
        let flexItems1 = flexContainer1.getElementsByClassName("flex1-item");
        if (flexItems1.length > 0) {
            flexContainer1.removeChild(flexItems1[flexItems1.length - 1]);
        }
    }

    function aplicarEstilosContenedor() {
        flexContainer1.style.flexDirection = selectFlexDirection.value;
        flexContainer1.style.justifyContent = selectJustifyContent.value;
        flexContainer1.style.alignItems = selectAlignItems.value;
        flexContainer1.style.flexWrap = selectFlexWrap.value;
        flexContainer1.style.alignContent = selectAlignContent.value;
    }
    aplicarEstilosContenedor();

    function cambiarTamañoContenedor() {
        flexContainer1.style.width = inputTamañoHorizontal.value + "%";
        flexContainer1.style.height = inputTamañoVertical.value + "px";
    }
    cambiarTamañoContenedor();

    function aplicarEstilosItems() {
        let flexItems1 = flexContainer1.getElementsByClassName("flex1-item");
        for (let item of flexItems1) {
            item.style.flexGrow = selectFlexGrow.value;
            item.style.flexShrink = selectFlexShrink.value;
            item.style.flexBasis = inputFlexBasis.value + "px";
        }
    }
    aplicarEstilosItems();
});
