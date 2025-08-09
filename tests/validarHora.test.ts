// tests/validarHora.test.ts

import { esHoraValida } from '../src/utils/validarHora';

describe('esHoraValida', () => {
  test('debería devolver true para formatos de hora válidos', () => {
    expect(esHoraValida('09:30')).toBe(true);
    expect(esHoraValida('15:00')).toBe(true);
  });

  test('debería devolver false para formatos de hora inválidos', () => {
    expect(esHoraValida('24:00')).toBe(false);
    expect(esHoraValida('5:30')).toBe(false);
    expect(esHoraValida('12:60')).toBe(false);
  });
});