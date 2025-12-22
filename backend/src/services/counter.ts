import fs from 'fs';
import path from 'path';

const COUNTER_FILE = path.join(__dirname, '../../data/.pdf-counter.txt');

/**
 * Get the next counter value and increment it
 * Counter starts at 1 if file doesn't exist
 */
export function getNextCounter(): number {
  let counter = 1;
  
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(COUNTER_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Read current counter if file exists
    if (fs.existsSync(COUNTER_FILE)) {
      const content = fs.readFileSync(COUNTER_FILE, 'utf-8').trim();
      counter = parseInt(content, 10) || 1;
    }
    
    // Increment and save
    const nextCounter = counter + 1;
    fs.writeFileSync(COUNTER_FILE, nextCounter.toString(), 'utf-8');
    
    return counter;
  } catch (error) {
    console.error('Error managing counter:', error);
    // Return current counter even if write fails
    return counter;
  }
}








