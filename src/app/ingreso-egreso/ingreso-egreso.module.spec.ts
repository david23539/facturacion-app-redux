import { IngresoEgresoModule } from './ingreso-egreso.module';

describe('IngresoEgresoModule', () => {
  let ingresoEgresoModule: IngresoEgresoModule;

  beforeEach(() => {
    ingresoEgresoModule = new IngresoEgresoModule();
  });

  it('should create an instance', () => {
    expect(ingresoEgresoModule).toBeTruthy();
  });
});
