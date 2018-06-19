import { DataDisplayModule } from './data-display.module';

describe('DataDisplayModule', () => {
  let sharedModule: DataDisplayModule;

  beforeEach(() => {
    sharedModule = new DataDisplayModule();
  });

  it('should create an instance', () => {
    expect(sharedModule).toBeTruthy();
  });
});
