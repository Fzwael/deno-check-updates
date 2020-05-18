# deno-check-updates
Automatically checks deno dependencies versions

## Help
deno run -A main.ts -h

## Check updates
deno run -A main.ts -f import_map.json


### Notes:
For now this is not a stable feature : https://deno.land/manual/linking_to_external_code/import_maps

To use : ```deno run -A --importmap=import_map.json --unstable main.ts -f import_map.json```