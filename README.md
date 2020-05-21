# deno-check-updates
Automatically checks deno dependencies versions

## Help
deno run -A https://deno.land/x/deno_check_updates/main.ts -h

## Check updates
``deno run -A --unstable https://deno.land/x/deno_check_updates/main.ts -f import_map.json``

## Example output
For this input file :

```json
{
  "imports": {
    "soxa/": "https://deno.land/x/soxa@v1.0/",
    "soxa2/": "https://deno.land/x/soxa@v0.4/",
    "checksum": "https://deno.land/x/checksum@1.2.0",
  }
}
```

| name | module  | url  | version | latest |
| :---:| :-----: | :--: | :-----: | :----: |
| soxa  | soxa | "https://deno.land/x/soxa@v1.0/" |  "v1.0" | "v1.0"
| soxa2 | soxa | "https://deno.land/x/soxa@v1.0/" |  "v1.0" | "v1.0"
| checksum | checksum | "https://deno.land/x/checksum@1.2.0" |  "v1.2.0" | "v1.4.0"

### Notes:
For now this is not a stable feature : https://deno.land/manual/linking_to_external_code/import_maps