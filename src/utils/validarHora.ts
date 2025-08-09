// src/utils/validarHora.ts

export const esHoraValida = (hora: string): boolean => {
  const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(hora);
};