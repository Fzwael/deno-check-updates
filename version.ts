// We handle the methods to look for the latest versions
import { dependencyType } from "./types/dependencyType.ts";
import { soxa } from 'https://deno.land/x/soxa/mod.ts'

export async function addLatestVersions(dependencies: dependencyType[]): Promise<dependencyType[]> {
  let result;
  const databaseResult = await soxa.get('https://raw.githubusercontent.com/denoland/deno_website2/master/database.json')
    .catch((error) => {
      console.error('Error getting the database.json file ', error);
    });
  const database = databaseResult.data;
  result = await Promise.all(dependencies.map(async (dependency) => {
    if (database[dependency.module]?.type === 'github') {
      const versionResult = await soxa.get(`https://api.github.com/repos/${database[dependency.module].owner}/${database[dependency.module].repo}/releases/latest`)
        .catch((error) => {
          console.error('Error getting the latest dependency ', error);
        });
      dependency.latest = versionResult.data.tag_name;
      dependency.upToDate = versionResult.data.tag_name === dependency.version;
      return dependency;

    } else {
      console.error('This type is not supported yet, please report this with dependency name = ', dependency.module);
      return dependency;
    }
  }));
  return result;
}