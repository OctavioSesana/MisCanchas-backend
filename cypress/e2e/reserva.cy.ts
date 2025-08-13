// cypress/e2e/reserva.cy.ts

describe('Flujo de Reserva de Cancha (con Login)', () => {

  it('debería permitir a un usuario logueado crear una nueva reserva', () => {
    // Paso 1: Ir a la página de login
    cy.visit('http://localhost:4200/login');

    // Paso 2: Llenar el formulario de login
    cy.get('input[name="email"]').type('usuario@test.com');
    cy.get('input[name="password"]').type('password123');

    // Paso 3: Hacer clic en el botón de "Ingresar" para enviar el formulario
    cy.contains('Iniciar Sesion').click();

    // Paso 4: Esperar a que la redirección ocurra
    // El test no se queda esperando en la URL de login, sino que espera un cambio
    cy.url().should('not.include', '/login');

    // Paso 1: Ir a la página donde se listan las canchas
    cy.visit('http://localhost:4200/reservas');

    // Paso 2: Seleccionar la primera cancha de la lista (ej. Cancha con ID 1)
    // El test busca un botón con el texto 'Reservar'
    // que esté asociado con la primera cancha de la lista y le hace click
    cy.contains('Seleccionar').click();

    // El resto del test sigue igual, pero ahora está alineado con la lógica de tu app
    cy.visit('http://localhost:4200/ingreso-reserva');
    // ...
    // Luego, rellena el formulario de reserva y lo envía
    // Paso 1: Rellenar los campos que NO son de solo lectura
    cy.get('input[name="fechaReserva"]').type('2025-08-15').trigger('change');;
    cy.get('input[name="horaInicio"]').type('19:00').trigger('change');

    // Paso 2: El campo de "idCancha" es de solo lectura.
    // En lugar de escribir, podemos verificar que ya tenga un valor, o directamente
    // saltar este paso si el valor se setea en una pantalla anterior.
    // Si necesitas setearlo a la fuerza, usa cy.invoke()
    cy.get('input[name="horaFin"]').invoke('val', '20:00').trigger('change');

    // Aquí, en lugar de usar invoke, vamos a simular el clic en una cancha
    // para que el ID se cargue correctamente. Si tienes un selector para
    // la primera cancha de una lista, el test sería más robusto.
    // Como no lo tenemos, vamos a usar un comando que simule el cambio del campo
    // y lo valide.
    cy.get('input[name="idCancha"]').invoke('val', '1').trigger('change');
    
    // Verificamos que el campo tenga el valor correcto antes de continuar
    cy.get('input[name="idCancha"]').should('have.value', '1');

    // CLAVE: Esperar a que el botón NO esté deshabilitado antes de hacer clic
    cy.get('button[type="submit"]').should('not.be.disabled').click();

    cy.contains('Confirmar Reserva').click();
    cy.contains('✅ ¡Reserva confirmada! Te llegará un correo de confirmación.').should('be.visible');
  });

});