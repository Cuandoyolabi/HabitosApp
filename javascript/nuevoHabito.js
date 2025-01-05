"use strict";

// Funcion sobre eleccion del color
let colorSeleccionado = "";

export function inicializadorSelectorDeColor(){

    const opcionesDeColor = document.querySelectorAll(".color__opcion");
    opcionesDeColor.forEach((opcion) => {
        opcion.addEventListener("click", () => {
            
            colorSeleccionado = opcion.style.backgroundColor;

            opcionesDeColor.forEach((opcion) => opcion.classList.remove("seleccionado"));
            opcion.classList.add("seleccionado");
        });
    });
} 

inicializadorSelectorDeColor();

// Funcion de creacion de habito
export function crearNuevoHabito(event){
    
    //Evitar el formulario por defecto
    event.preventDefault(); 

    //Ids de la seccion de configuracion
    const ventana__habitos__lista = document.getElementById("ventana__habitos__lista__id");

    const habits__container__list__id = document.getElementById("habits__container__list__id");
    const graphic__container__id = document.getElementById('graphic__container__id');
    const habitName = document.getElementById("habitName");
    const form = document.getElementById('habitForm');

    //Verifica limite de elementos
    const maximoDeElementos = 6;
    if(graphic__container__id.children.length >= maximoDeElementos){
        return;
    }
  
    // Verificacion de que el usuario selecciono un color
    const color = colorSeleccionado;
    if(!color){
        alert("Por favor, selecciona un color");
        return;
    }

    //Agregar el habito al contenedor de habitos
    //nuevo__habito__recuadro.innerHTML = habitName.value;
    let nuevo__habito__recuadro = document.createElement("div");
    let nuevo__recuadro__Arriba = document.createElement("div");
    let nuevo__recuadro__Abajo = document.createElement("div");
    let recuadroArriba__Conjunto = document.createElement("div");

    let recuadroArriba__Dias = document.createElement("h2");
    let recuadroArriba__numero = document.createElement("h2");
    let recuadroAbajo__texto = document.createElement("h2");
    let buttonCompletar = document.createElement("button");

    //Informacion
    recuadroAbajo__texto.innerText = habitName.value;
    recuadroArriba__numero.textContent = 10;
    recuadroArriba__Dias.textContent = "Dias";
    buttonCompletar.innerHTML = '<i class="fa-solid fa-check"></i>'; 

    //Estilos
    nuevo__habito__recuadro.className = "nuevo__habitoAgregado";
    nuevo__recuadro__Arriba.className = "nuevo__recuadro__Arriba";
    recuadroArriba__numero.className = "recuadroArriba__numero";
    recuadroArriba__Dias.className = "recuadroArriba__dias";
    recuadroArriba__Conjunto.className = "recuadroArriba__Conjunto";
    nuevo__recuadro__Abajo.className = "nuevo__recuadro__Abajo";
    recuadroAbajo__texto.className = "recuadroAbajo__texto";
    buttonCompletar.className ="buttonCompletar";

    //Estructura
    nuevo__habito__recuadro.appendChild(nuevo__recuadro__Arriba);
    nuevo__habito__recuadro.appendChild(nuevo__recuadro__Abajo);
    nuevo__recuadro__Arriba.appendChild(recuadroArriba__Conjunto);

    recuadroArriba__Conjunto.appendChild(recuadroArriba__numero);
    recuadroArriba__Conjunto.appendChild(recuadroArriba__Dias);
    nuevo__recuadro__Arriba.appendChild(buttonCompletar);
    nuevo__recuadro__Abajo.appendChild(recuadroAbajo__texto);
    habits__container__list__id.appendChild(nuevo__habito__recuadro);      
    

    /* Separacion para mejor organizacion */

    //Agregar el habito a la configuracion de habitos
    let nuevo__habito__configuracion = document.createElement("div");
    let habito__nombre = document.createElement("h2");
    let habito__separacion = document.createElement("div");
    let habito__editar = document.createElement("button");
    let habito__eliminar = document.createElement("button");

    habito__editar.textContent = "Editar";
    habito__eliminar.textContent = "Eliminar";
    habito__nombre.textContent = habitName.value;

    habito__eliminar.id = "habito__eliminar__id";
    habito__editar.id = "habito__editar__id";

    habito__editar.className = "habito__editar";
    habito__eliminar.className = "habito__eliminar";
    habito__nombre.className = "habito__nombre";
    nuevo__habito__configuracion.className = "nuevo__habitoConfiguracion";
    habito__separacion.className = "habito__separacion";

    habito__separacion.appendChild(habito__editar);
    habito__separacion.appendChild(habito__eliminar);
    nuevo__habito__configuracion.appendChild(habito__nombre);
    nuevo__habito__configuracion.appendChild(habito__separacion);
    ventana__habitos__lista.appendChild(nuevo__habito__configuracion);     

    //Crear el nuevo habito e ingresarlo a la grafica.
    let nuevoHabito = document.createElement('div');
    nuevoHabito.className = 'nuevo__habito';
    nuevoHabito.style.backgroundColor = colorSeleccionado;
    graphic__container__id.appendChild(nuevoHabito);

    //Guardamos los habitos en localStorage
    guardarHabitos();

    //Resetear formulario y modal
    form.reset();
    cerrarModal();
    
};

//Mostrar Modal
export function mostrarlModal(){
    
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    cubierta__container__id.style.display = 'block';
}

//Cerrar modal
export function cerrarModal(){

    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    cubierta__container__id.style.display = 'none';
}

//Funcion para guardar habitos en localStorage
export  function guardarHabitos(){

    const habits__container__list__id = document.getElementById("habits__container__list__id");
    const graphic__container__id = document.getElementById("graphic__container__id");

    const habitos = Array.from(habits__container__list__id.children).map((habitItem, index) => {
        
        //Texto
        const habitElement = habitItem.querySelector(".nuevo__recuadro__Abajo h2");
        const habitText =  habitElement ? habitElement.textContent.replace("✔", "").trim() : "";
        const graphicHabit = graphic__container__id.children[index];

        //Verificacion de que el habito se implemento en la grafica y el contenedor
        if(!graphicHabit){
            console.error(`Error: No se encontro el elemento grafico para el indice ${index}`);
            return null;
        }

        //Color
        const habitColor = graphicHabit.style.backgroundColor;

        //Implementacion de ID
        let habitId =  uuid.v4();
        habitItem.dataset.id = habitId;

        return {
            id: habitId,
            text: habitText,
            color: habitColor,
        };
    }).filter(habit => habit !== null);

    //Guardado en localStorgae
    localStorage.setItem("habitos", JSON.stringify(habitos));

}

// Funcion para cargar habitos desde localStorage a la grafica y al contenedor
export function cargarHabitos(){
    
    const habits__container__list__id = document.getElementById("habits__container__list__id");
    const graphic__container__id = document.getElementById("graphic__container__id");
    const habitosGuardados = JSON.parse(localStorage.getItem("habitos")) || [];

    habitosGuardados.forEach((habit) => {
        //Recrea el habito con su estructura y estilos para el contenedor de habitos
        //nuevo__habito__recuadro.innerHTML = habitName.value;
        let nuevo__habito__recuadro = document.createElement("div"); 
        let nuevo__recuadro__Arriba = document.createElement("div");
        let nuevo__recuadro__Abajo = document.createElement("div");
        let recuadroArriba__Conjunto = document.createElement("div");

        let recuadroArriba__Dias = document.createElement("h2");
        let recuadroArriba__numero = document.createElement("h2");
        let recuadroAbajo__texto = document.createElement("h2");
        let buttonCompletar = document.createElement("button");

        //Informacion
        recuadroAbajo__texto.innerText = habit.text;
        recuadroArriba__numero.textContent = 10;
        recuadroArriba__Dias.textContent = "Dias";
        buttonCompletar.innerHTML = '<i class="fa-solid fa-check"></i>'; 

        //Estilos
        nuevo__habito__recuadro.className = "nuevo__habitoAgregado";
        nuevo__recuadro__Arriba.className = "nuevo__recuadro__Arriba";
        recuadroArriba__numero.className = "recuadroArriba__numero";
        recuadroArriba__Dias.className = "recuadroArriba__dias";
        recuadroArriba__Conjunto.className = "recuadroArriba__Conjunto";
        nuevo__recuadro__Abajo.className = "nuevo__recuadro__Abajo";
        recuadroAbajo__texto.className = "recuadroAbajo__texto";
        buttonCompletar.className ="buttonCompletar";

        //Estructura
        nuevo__habito__recuadro.appendChild(nuevo__recuadro__Arriba);
        nuevo__habito__recuadro.appendChild(nuevo__recuadro__Abajo);
        nuevo__recuadro__Arriba.appendChild(recuadroArriba__Conjunto);

        recuadroArriba__Conjunto.appendChild(recuadroArriba__numero);
        recuadroArriba__Conjunto.appendChild(recuadroArriba__Dias);
        nuevo__recuadro__Arriba.appendChild(buttonCompletar);
        nuevo__recuadro__Abajo.appendChild(recuadroAbajo__texto);
        habits__container__list__id.appendChild(nuevo__habito__recuadro);          

        /*   Separacion para mejor organizacion   */
        

        //Añadir el habito a la lista de habitos
        habits__container__list__id.appendChild(nuevo__habito__recuadro);

        //Crear el nuevo habito para la grafica
        let nuevoHabito = document.createElement("div");
        nuevoHabito.className = 'nuevo__habito';
        nuevoHabito.style.backgroundColor = habit.color || "gray";

        //Añadir el habito a la grafica
        graphic__container__id.appendChild(nuevoHabito);
        
    });
}

// Funcion para cargar los habitos a la pagina de habitos de Configuracion
export function cargarHabitoConfiguracion(){
   
    //AQUI SE DEBE IMPLEMENTAR LA FUNCION DE ELIMINAR

    const ventana__habitos__lista = document.getElementById("ventana__habitos__lista__id");
    const habitosGuardados = JSON.parse(localStorage.getItem("habitos")) || [];
    habitosGuardados.forEach((habit) => { 

        let nuevo__habito__configuracion = document.createElement("div");
        let habito__nombre = document.createElement("h2");
        let habito__separacion = document.createElement("div");
        let habito__editar = document.createElement("button");
        let habito__eliminar = document.createElement("button");

        //Texto asignado
        habito__editar.textContent = "Editar";
        habito__eliminar.textContent = "Eliminar";
        habito__nombre.textContent = habit.text;

        //Ids asignados
        habito__eliminar.id = "habito__eliminar__id";
        habito__editar.id = "habito__editar__id";

        //Clases asignadas
        habito__editar.className = "habito__editar";
        habito__eliminar.className = "habito__eliminar";
        habito__nombre.className = "habito__nombre";
        nuevo__habito__configuracion.className = "nuevo__habitoConfiguracion";
        habito__separacion.className = "habito__separacion";

        //Elementos agregados
        habito__separacion.appendChild(habito__editar);
        habito__separacion.appendChild(habito__eliminar);
        nuevo__habito__configuracion.appendChild(habito__nombre);
        nuevo__habito__configuracion.appendChild(habito__separacion);
        ventana__habitos__lista.appendChild(nuevo__habito__configuracion);     

    }); 
}

document.addEventListener("DOMContentLoaded", cargarHabitos);
cargarHabitoConfiguracion();


//Funcion que elimina el habito seleccionado
export function eliminarHabito(id){

    const habitos = JSON.parse(localStorage.getItem("habitos")) || [];
    const indice = habitos.map(habito => habito.id === id);
    console.log(indice)
    console.log(habitos)

    localStorage.setItem("nuevosHabitos", JSON.stringify(nuevosHabitos));

}

//Funcion para editar el habito seleccionado
export function editarHabito(){
}

// Funcion que obtiene el ID
export function obtenerIdDesdeUrl(){
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

