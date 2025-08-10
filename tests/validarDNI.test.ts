// tests/validarDNI.test.ts

import { esDNIValido } from '../src/utils/validarDNI'; // <-- Correcto

describe('esDNIValido', () => {

  test('debería devolver true para un DNI válido de 8 dígitos', () => {
    // Casos de prueba que esperamos que pasen
    expect(esDNIValido(12345678)).toBe(true);
    expect(esDNIValido(98765432)).toBe(true);
  });

  test('debería devolver false para un DNI con un formato inválido', () => {
    // Casos de prueba que esperamos que fallen
    expect(esDNIValido(123456)).toBe(false);     // Muy corto
    expect(esDNIValido(123456789)).toBe(false);  // Muy largo
    expect(esDNIValido(500.5)).toBe(false);      // No es un número entero
    expect(esDNIValido(-12345678)).toBe(false); // Es negativo
  });
});