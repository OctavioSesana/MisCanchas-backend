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
  
  // Solicitar al usuario ingresar datos por teclado
  Cliente.dni = prompt("Ingrese su DNI:");
  Cliente.name = prompt("Ingrese su nombre:");
  Cliente.lastName = prompt("Ingrese su apellido:");
  Cliente.mail = prompt("Ingrese su mail:");
  Cliente.phone = prompt("Ingrese su telefono:");
  
  // Mostrar los datos ingresados por el usuario
  console.log();
  console.log("Datos del cliente:");
  console.log("DNI:", Cliente.dni);
  console.log("Nombre:", Cliente.name);
  console.log("Apellido:", Cliente.lastName);
  console.log("Mail:", Cliente.mail);
    console.log("Telefono:", Cliente.phone);  


// Crear el objeto Encargado que hereda de Persona
const Encargado = Object.create(Persona);

// Solicitar al usuario ingresar datos por teclado
Encargado.dni = prompt("Ingrese su DNI:");
Encargado.name = prompt("Ingrese su nombre:");
Encargado.lastName = prompt("Ingrese su apellido:");
Encargado.sueldo = prompt("Ingrese su sueldo:");

// Mostrar los datos ingresados por el usuario
console.log();
console.log("Datos del encargado:");
console.log("DNI:", Encargado.dni);
console.log("Nombre:", Encargado.name);
console.log("Apellido:", Encargado.lastName);
console.log("Sueldo:", Encargado.sueldo);


console.log(Persona.isPrototypeOf(Cliente)); // true
console.log(Persona.isPrototypeOf(Encargado)); // true


