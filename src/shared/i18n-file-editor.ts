import * as fs from 'node:fs';
import { deleteObjectValueAtPath, getObjectValueAtPath, setObjectValueAtPath } from '@/shared/object-path';
import { pushIgnoreDuplicates, removeSuffix } from '@/shared/utils';
import { format } from 'prettier';
import path from 'node:path';
import { getPWD } from '@/shared/get-pwd';
import { EditorConfig, getEditorConfig } from '@/shared/config';

export class I18nFileEditor {
  /**
   * A record of all namespaces and locales contents[locale][namespace]
   * @private
   */
  private contents: Record<string, Record<string, any>>;

  public static loadFromConfig(editorConfig?: EditorConfig) {
    if (!editorConfig) {
      editorConfig = getEditorConfig();
    }
    return new I18nFileEditor(
      editorConfig.locales,
      editorConfig.namespaces,
      editorConfig.defaultNamespace,
      editorConfig.pathToFiles,
      editorConfig.keyFile
    );
  }

  public constructor(
    private readonly locales: string[],
    private readonly namespaces: string[],
    private readonly defaultNamespace: string,
    private readonly pathToFiles: string,
    private readonly keyFile: string
  ) {
    this.contents = {};
    this.reload();
  }

  private resolveFilePath(locale: string, namespace: string) {
    return path.join(getPWD(), this.pathToFiles.replace('{{locale}}', locale).replace('{{ns}}', namespace));
  }

  reload() {
    this.contents = {};
    for (const locale of this.locales) {
      this.contents[locale] = {};
      for (const namespace of this.namespaces) {
        const file = this.resolveFilePath(locale, namespace);
        this.contents[locale][namespace] = JSON.parse(fs.readFileSync(file, { encoding: 'utf8' }));
      }
    }
  }

  save() {
    for (const locale of this.locales) {
      for (const namespace of this.namespaces) {
        const file = this.resolveFilePath(locale, namespace);
        fs.writeFileSync(file, JSON.stringify(this.contents[locale][namespace], null, 4), { encoding: 'utf8' });
      }
    }
  }

  private flattenTranslations(translations: any, prefix = '', result: any = {}) {
    for (const key of Object.keys(translations)) {
      if (typeof translations[key] === 'object') {
        this.flattenTranslations(translations[key], prefix + key + '.', result);
      } else {
        result[prefix + key] = translations[key];
      }
    }

    return result;
  }

  /**
   * Return all translations in a flatten format like { [namespace:key]: { [locale]: value } }
   */
  flatExport() {
    const result: any = {};

    for (const locale of this.locales) {
      for (const namespace of this.namespaces) {
        const translations = this.flattenTranslations(this.contents[locale][namespace]);

        for (const key of Object.keys(translations)) {
          result[namespace + ':' + key] ??= {};
          result[namespace + ':' + key][locale] = translations[key];
        }
      }
    }

    return result;
  }

  private parseKeyWithNamespace(keyWithNamespace: string) {
    const splitted = keyWithNamespace.split(':');
    if (splitted.length !== 2) {
      throw new Error('Invalid key (format `namespace:key`)');
    }
    const namespace = splitted[0];
    const key = splitted[1];

    if (!this.namespaces.includes(namespace)) {
      throw new Error('Unknown namespace');
    }

    const path = key.split('.');
    for (const part of path) {
      if (!/^[a-zA-Z0-9_]+$/.test(part)) {
        throw new Error('Invalid key only alphanumeric characters and underscores are allowed');
      }
    }

    return { namespace, key };
  }

  /**
   * Set values for a specific key
   *
   * @param keyWithNamespace
   * @param values
   * @param disableEdit throw an error if key already exists
   */
  setValues(keyWithNamespace: string, values: Record<string, string> | undefined, disableEdit?: boolean) {
    const { namespace, key } = this.parseKeyWithNamespace(keyWithNamespace);

    const locales = values ? Object.keys(values) : this.locales;

    for (const locale of locales) {
      if (!this.locales.includes(locale)) {
        throw new Error(`Unknown locale ${locale}`);
      }

      const content = this.contents[locale][namespace];

      const existingValue = getObjectValueAtPath(content, key);
      if (existingValue && typeof existingValue === 'object' && Object.keys(existingValue).length > 0) {
        throw new Error('Section already exists');
      } else if (disableEdit && existingValue) {
        throw new Error('Key already exists');
      }

      if (!values || typeof values[locale] !== 'string') {
        deleteObjectValueAtPath(content, key);
      } else {
        setObjectValueAtPath(content, key, values[locale]);
      }
    }
  }

  getValues(keyWithNamespace: string) {
    const { namespace, key } = this.parseKeyWithNamespace(keyWithNamespace);
    const result: Record<string, string> = {};

    for (const locale of this.locales) {
      const content = this.contents[locale][namespace];

      result[locale] = getObjectValueAtPath(content, key);
    }

    return result;
  }

  async buildKeyFile() {
    const defaultKeys: string[] = [];
    const keys: string[] = [];

    for (const locale of this.locales) {
      for (const namespace of this.namespaces) {
        const translations = this.flattenTranslations(this.contents[locale][namespace]);

        for (let key of Object.keys(translations)) {
          // Manage pluralization
          key = removeSuffix(key, ['_zero', '_one', '_other']);

          if (namespace === this.defaultNamespace) {
            pushIgnoreDuplicates(defaultKeys, key);
          }

          const fullKey = namespace + ':' + key;
          pushIgnoreDuplicates(keys, fullKey);
        }
      }
    }

    const content = `// This file is auto-generated by the build script

      export type TrKeys =
        ${[...defaultKeys, ...keys]
          .map(
            (key) => `/**
        * http://localhost:25560?key=${encodeURI(key)}
        */
        | '${key}'`
          )
          .join('\n')};
      
      export const trKeys = (key: TrKeys) => key;`;

    await format(content, { parser: 'typescript' });
    fs.writeFileSync(path.join(getPWD(), this.keyFile), await format(content, { parser: 'typescript' }), {
      encoding: 'utf8',
    });
  }
}
