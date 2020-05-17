import { readJsonSync } from "https://deno.land/std/fs/read_json.ts";
import { importsType } from './types/importType.ts'

export async function readFile(filename: string) {
  console.debug('Trying to read file ', filename);
  try {
    const fileContent = readJsonSync(filename) as importsType;
    console.log('Content ', fileContent);
    console.log('Content imports', fileContent.imports);
  } catch (err) {
    console.error('Cant read file !');
  }
}