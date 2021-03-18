// We handle the methods to look for the latest versions
import { dependencyType } from "./types/dependencyType.ts";
import { soxa } from 'https://deno.land/x/soxa/mod.ts';

export async function addLatestVersions(dependencies: dependencyType[]): Promise<dependencyType[]> {
  return await Promise.all(dependencies.map(async (dependency: dependencyType) => {
    const url = `https://cdn.deno.land/${dependency.module}/meta/versions.json`;
    return await getVersionFromUrl(dependency, url);
  }));
}

async function getVersionFromUrl(dependency: dependencyType, url: string): Promise<dependencyType> {
  const versionsList = await soxa.get(url)
    .catch((error) => {
      console.error('Error getting the latest dependency ', error);
    });
  if (versionsList.data) {
    dependency.latest = versionsList.data.latest;
    dependency.upToDate = versionsList.data.latest === dependency.version;
  } else {
    dependency.latest = "not found";
  }
  return dependency;
}
