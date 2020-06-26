# deno-check-updates
Automatically checks deno dependencies versions

## Help
deno run -A https://deno.land/x/deno_check_updates/main.ts -h

## Check updates
```shell
$ deno run -A --unstable https://deno.land/x/deno_check_updates/main.ts -f example_map.json
```

## Example output
For this input file :

```json
{
  "imports": {
    "soxa/": "https://deno.land/x/soxa@v1.0/",
    "soxa2/": "https://deno.land/x/soxa@v0.4/",
    "checksum": "https://deno.land/x/checksum@1.2.0",
    "http": "https://deno.land/std@0.51.0/http/"
  }
}
```

| name | module  | url  | version | latest | upToDate
| :---:| :-----: | :--: | :-----: | :----: | :----: |
| soxa  | soxa | "https://deno.land/x/soxa@v1.0/" |  "v1.1" | "v1.1" | true
| soxa2 | soxa | "https://deno.land/x/soxa@v1.0/" |  "v1.1" | "v1.1" | true
| checksum | checksum | "https://deno.land/x/checksum@1.2.0" |  "v1.2.0" | "v1.4.0" | false
| http | std | "https://deno.land/std@0.51.0/http/" |  "v0.51.0" | "v0.52.0" | false

### Notes:
For now this is not a stable feature : https://deno.land/manual/linking_to_external_code/import_maps