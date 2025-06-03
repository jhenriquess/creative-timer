import * as fs from 'fs';
import * as path from 'path';

export class FileStorage {
  private configPath = path.join(process.cwd(), 'timer-config.json');

  async saveTime(time: number): Promise<void> {
    try {
      await fs.promises.writeFile(
        this.configPath,
        JSON.stringify({ selectedTime: time }),
        'utf-8'
      );
    } catch (error) {
      console.error('Error saving time:', error);
    }
  }

  async getTime(): Promise<number> {
    try {
      if (fs.existsSync(this.configPath)) {
        const data = await fs.promises.readFile(this.configPath, 'utf-8');
        const config = JSON.parse(data);
        return config.selectedTime || 0;
      }
    } catch (error) {
      console.error('Error reading time:', error);
    }
    return 0;
  }
}
