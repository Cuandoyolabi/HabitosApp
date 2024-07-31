

//Header y Nav 




//  -----------Main seccion 1---------- 
function crearNuevoHabito(event){

    event.preventDefault(); //Evitar el formulario por defecto

    const maximoDeElementos = 5;
    const graphic__container = document.getElementById('graphic__container');
    const graphic__container__plus = document.getElementById('graphic__container__plus');
    const form = document.getElementById('habitForm');

    //Verifica que solo sean 5 elementos
    if(graphic__container.children.length >= maximoDeElementos){
        return;
    }

    //Informacion que reqiere la ventana emergente
    let color = document.getElementById('habitColor').value;

    
    //Crear el nuevo habito con la informacion
    let nuevoHabito = document.createElement('div');
    nuevoHabito.className = 'nuevo__habito';
    nuevoHabito.style.backgroundColor = color;
    nuevoHabito.style.width = '50px';
    nuevoHabito.style.height = '20px';
    nuevoHabito.style.display = 'flex';
    nuevoHabito.style.alignItems = 'center';
    nuevoHabito.style.justifyContent = 'center';

    //Añadimos el div al contenedor
    graphic__container.appendChild(nuevoHabito);

    //Cerramos la ventana emergente
    cerrarModal();

    crearVentanaDeHabito();
    
    //Limpiar el formulario
    form.reset();
};


function mostrarlModal(){
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}

function cerrarModal(){
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}








document.getElementById('graphic__container__plus').addEventListener('click', mostrarlModal);
document.querySelector('.close').addEventListener('click', cerrarModal);
document.getElementById('habitForm').addEventListener('submit', crearNuevoHabito);



//Creando la ventana de color.
// Simple example, see optional options for more configuration.


//Como crear una base de datos y como conectarla.
//Ver videos acerca de position
//Ver videos acerca e z index




//Main seccion 2


//Footer

//Pruebas de conexion a MYSQL

