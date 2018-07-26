import { CsvService } from '../../app/settings/services/csv.service';

export class MockCsvService extends CsvService {

  constructor() {
    super();
  }

  downloadAsCsv(): void {}

  covertToCommaSeparatedString(data: any[], propertiesToColumnTitles: Map<string, string>): string {
    return 'a, b, c';
  }
}
