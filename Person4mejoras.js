let Persona = {
    dni: 0,
    name: "",
    lastName: "",
}


Object.setPrototypeOf(Persona, {
    dni: value => Persona.dni = value,
    name: value => Persona.name = value,
    lastName: value => Persona.lastName = value,
});

  
// Crear el objeto Cliente que hereda de Persona
const Cliente = Object.create(Persona);
  
console.log("Bienvenido al sistema de carga de datos de clientes y encargados");
let opcion = prompt("Desea cargar un nuevo cliente? Ingrese 'S' para continuar o 'N' para salir:");

// Solicitar al usuario ingresar datos por teclado
let clientes = [];
contCliente = 0;
while (opcion === "S") {
    let Cliente = {};
    Cliente.dni = prompt("Carga datos Cliente - Ingrese su DNI:");
    if (isNaN(Cliente.dni)) {
        console.log("El DNI ingresado no es valido. Por favor, vuelva a intentarlo.");
        continue;
    } // validar cuando el dni ya esta registrado asi ya me tira todos los datos del cliente
    let clienteExistente = clientes.find(cliente => cliente.dni === Cliente.dni);
    if (clienteExistente) {
        console.log("El DNI ingresado ya se encuentra registrado. Los datos del cliente son:");
        console.log(clienteExistente);
        let modificar = prompt("Desea modificar el correo electrónico del cliente? Ingrese 'S' para continuar o 'N' para salir:");
        if (modificar === 'S') {
            let nuevoMail = prompt("Ingrese el nuevo correo electrónico:");
            if (!nuevoMail.includes("@")) {
                console.log("El correo electrónico ingresado no es válido. Por favor, vuelva a intentarlo.");
            } else {
                clienteExistente.mail = nuevoMail;
                console.log("El correo electrónico ha sido actualizado. Los datos del cliente son:");
                console.log(clienteExistente);
            }
        }
        let modificarTel = prompt("Desea modificar el teléfono del cliente? Ingrese 'S' para continuar o 'N' para salir:");
        if (modificarTel === 'S') {
            let nuevoTelefono = prompt("Ingrese el nuevo teléfono:");
            if (isNaN(nuevoTelefono)) {
                console.log("El teléfono ingresado no es válido. Por favor, vuelva a intentarlo.");
            } else {
                clienteExistente.phone = nuevoTelefono;
                console.log("El teléfono ha sido actualizado. Los datos del cliente son:");
                console.log(clienteExistente);
            }
        }
        opcion = prompt("Desea cargar un nuevo cliente? Ingrese 'S' para continuar o 'N' para salir:");
        continue; // mostrar la opcion de si no quiero cargar mas clientes
    } // validar cuando el dni ya esta registrado asi ya me tira todos los datos del cliente
    Cliente.name = prompt("Carga datos Cliente - Ingrese su nombre:");
    Cliente.lastName = prompt("Carga datos Cliente - Ingrese su apellido:");
    Cliente.mail = prompt("Carga datos Cliente - Ingrese su mail:");
    if (!Cliente.mail.includes("@")) {
        console.log("El mail ingresado no es valido. Por favor, vuelva a intentarlo.");
        continue;
    }
    Cliente.phone = prompt("Carga datos Cliente - Ingrese su telefono:");
    if (isNaN(Cliente.phone)) {
        console.log("El telefono ingresado no es valido. Por favor, vuelva a intentarlo.");
        continue;
    }
    clientes.push(Cliente);
    // Mostrar los datos ingresados por el usuario
    console.log();
    console.log("Datos del cliente:");
    console.log("DNI:", Cliente.dni);
    console.log("Nombre:", Cliente.name);
    console.log("Apellido:", Cliente.lastName);
    console.log("Mail:", Cliente.mail);
    console.log("Telefono:", Cliente.phone);
    console.log("Clientes cargados: ", clientes);
    contCliente++;
    opcion = prompt("Desea cargar un nuevo cliente? Ingrese 'S' para continuar o 'N' para salir:");
}
if (contCliente === 0) {
    console.log("Usted no cargo ningun cliente");
}
if (opcion === "N") {
    console.log("Usted ha decidido no cargar mas clientes");
}
if (contCliente > 0) {
    console.log("Se han cargado", contCliente, "cliente/s");
}

console.log("Clientes cargados: ", clientes);

console.log("Finalizo la carga de clientes");

// Crear el objeto Encargado que hereda de Persona
const Encargado = Object.create(Persona);

let opcionEncargado = prompt("Desea cargar un nuevo encargado? Ingrese 'S' para continuar o 'N' para salir:");

// Solicitar al usuario ingresar datos por teclado
let encargados = [];
contEncargado = 0;
while (opcionEncargado === "S") {
    let Encargado = {};
    Encargado.dni = prompt("Carga datos Encargado - Ingrese su DNI:");
    if (isNaN(Encargado.dni)) {
        console.log("El DNI ingresado no es valido. Por favor, vuelva a intentarlo.");
        continue;
    }
    let encargadoExistente = encargados.find(encargado => encargado.dni === Encargado.dni);
    if (encargadoExistente) {
        console.log("El DNI ingresado ya se encuentra registrado. Los datos del encargado son:");
        console.log(encargadoExistente);
        let modificar = prompt("Desea modificar el sueldo del encargado? Ingrese 'S' para continuar o 'N' para salir:");
        if (modificar === 'S') {
            let nuevoSueldo = prompt("Ingrese el nuevo sueldo:");
            if (isNaN(nuevoSueldo)) {
                console.log("El sueldo ingresado no es válido. Por favor, vuelva a intentarlo.");
            } else {
                encargadoExistente.sueldo = nuevoSueldo;
                console.log("El sueldo ha sido actualizado. Los datos del encargado son:");
                console.log(encargadoExistente);
            }
        }
        opcionEncargado = prompt("Desea cargar un nuevo encargado? Ingrese 'S' para continuar o 'N' para salir:");
        continue; // mostrar la opcion de si no quiero cargar mas encargados
    }
    Encargado.name = prompt("Carga datos Encargado - Ingrese su nombre:");
    Encargado.lastName = prompt("Carga datos Encargado - Ingrese su apellido:");
    Encargado.sueldo = prompt("Carga datos Encargado - Ingrese su sueldo:");
    if (isNaN(Encargado.sueldo)) {
        console.log("El sueldo ingresado no es valido. Por favor, vuelva a intentarlo.");
        continue;
    }
    encargados.push(Encargado);
    // Mostrar los datos ingresados por el usuario
    console.log();
    console.log("Datos del encargado:");
    console.log("DNI:", Encargado.dni);
    console.log("Nombre:", Encargado.name);
    console.log("Apellido:", Encargado.lastName);
    console.log("Sueldo:", Encargado.sueldo);
    console.log("Encargados cargados: ", encargados);
    contEncargado++;
    opcionEncargado = prompt("Desea cargar un nuevo encargado? Ingrese 'S' para continuar o 'N' para salir:");
}
if (contEncargado === 0) {
    console.log("Usted no cargo ningun encargado");
}
if (opcionEncargado === "N") {
    console.log("Usted ha decidido no cargar mas encargados");
}
if (contEncargado > 0) {
    console.log("Se han cargado", contEncargado, "encargado/s");
}

console.log("Encargados cargados: ", encargados);

console.log("Finalizo la carga de encargados");
// Si cargo dos reservas en el mismo ingreso, necesito cargar dos clientes y dos encargados, por eso hago el while
// Si cargo una reserva en un ingreso, necesito cargar un cliente y un encargado

console.log("Todos los clientes:");
console.table(clientes);

console.log("Todos los encargados:");
console.table(encargados);

console.log(Persona.isPrototypeOf(Cliente)); // true
console.log(Persona.isPrototypeOf(Encargado)); // true

// para el DELETE, lo que se da de baja o se cancela es la reserva, no el cliente ni el encargado
// para el UPDATE, se puede modificar el cliente o el encargado, pero no se puede modificar el DNI
