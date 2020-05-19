import { readJsonSync } from "https://deno.land/std/fs/read_json.ts";
import { importsType } from "./types/importType.ts";
import { dependencyType } from "./types/dependencyType.ts";
import { addLatestVersions } from './version.ts'

export async function readDependencies(filename: string) : Promise<dependencyType[]> {
  try {
    const fileContent = await readJsonSync(filename) as importsType;
    console.log('IMPORTS : ', fileContent.imports);
    return extractDependencyAndVersion(fileContent.imports);
  } catch (err) {
    console.error("Cant read imports file !");
    return [];
  }
}

function extractDependencyAndVersion(imports: object): dependencyType[] {
  let result: dependencyType[] = [];
  for (const [key, value] of Object.entries(imports)) {
    // TODO find cleaner solution to extract version
    const substr = value.substring(value.indexOf("@") + 1);
    const exactVersion = substr.substring(0, substr.indexOf("/"));
    // In case if there is an extra backslash at the end of the dependency name
    const exactName = key.lastIndexOf('/') ? key.substring(0, key.lastIndexOf('/')) : key;
    // Find the correct module name
    const moduleUrl = value.substring(0, value.lastIndexOf("@"));
    const moduleName = moduleUrl.slice(moduleUrl.lastIndexOf("/") + 1);

    result.push({
      name: exactName,
      module: moduleName,
      url: value,
      version: exactVersion,
    });
  }
  return result;
}
