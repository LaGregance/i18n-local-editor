# I18n Local Editor

A simple tool to edit your JSON translations file elegantly and generate typed keys.

## Config

`i18n-local-editor.json`:
```json
{
  "locales": ["fr", "en"],
  "defaultLocale": "en",
  "namespaces": ["common", "errors"],
  "keyFile": ".locales/trKeys.ts",
  "pathToFiles": ".locales/{{locale}}/{{ns}}.json",
  "fileType": "json"
}
```

## Run the server

```bash
yarn i18n-local-editor
```
