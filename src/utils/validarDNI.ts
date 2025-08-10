// src/utils/validarDNI.ts

export const esDNIValido = (dni: number): boolean => {
  // El DNI debe ser un número positivo de 8 dígitos
  if (typeof dni !== 'number' || !Number.isInteger(dni) || dni < 0) {
    return false;
  }
  const dniString = dni.toString();
  return dniString.length === 8;
};