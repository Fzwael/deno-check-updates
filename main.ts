import { HELP_COMMANDS, FILE_COMMANDS } from './constants/commands.ts';
import { help } from './help.ts';
import { readFile } from './file.ts';

async function main(args: string[]) {
  console.debug("Welcome to Deno Check Updates!");
  if (args.length > 0) {
    console.debug("The arguments are : ", args);
    const mainArgument = args[0];
    if (HELP_COMMANDS.includes(mainArgument)) {
      help();
    } else if (FILE_COMMANDS.includes(mainArgument)) {
      if (args[1]) {
        console.debug("Trying to read the file : ", args[1]);
        readFile(args[1]);
      }
    }
  } else {
    console.debug("No arguments are passed ...");
  }
}

if (import.meta.main) {
  await main(Deno.args);
}
