import { readJsonSync } from "https://deno.land/std/fs/read_json.ts";
import { importsType } from "./types/importType.ts";
import { dependencyType } from "./types/dependencyType.ts";

export async function readFile(filename: string) {
  console.debug("Trying to read file ", filename);
  try {
    const fileContent = readJsonSync(filename) as importsType;
    console.log("Content ", fileContent);
    console.log("Content imports", fileContent.imports);
    console.log("Result is ", extractDependencyAndVersion(fileContent.imports));
  } catch (err) {
    console.error("Cant read file !");
  }
}

function extractDependencyAndVersion(imports: object): dependencyType[] {
  let result: dependencyType[] = [];
  for (const [key, value] of Object.entries(imports)) {
    // TODO find cleaner solution to extract version
    const substr = value.substring(value.indexOf("@") + 1);
    const exactVersion = substr.substring(0, substr.indexOf("/"));
    result.push({
      name: key,
      url: value,
      version: exactVersion,
    });
  }
  return result;
}
