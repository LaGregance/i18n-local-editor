import { EDITOR_CONFIG } from '@/i18n/config';
import * as fs from 'node:fs';

export abstract class I18nLoader {
  static resolveFilePath(locale: string, namespace: string) {
    return EDITOR_CONFIG.pathToFiles.replace('{{locale}}', locale).replace('{{ns}}', namespace);
  }

  static loadFile(filePath: string) {
    // TODO: Manage non JSON files
    return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
  }

  /**
   * Take a JS object of key/value pair that contain nested object and flatten it
   * @param translations
   * @param prefix
   * @param result
   */
  private static flattenTranslations(translations: any, prefix = '', result: any = {}) {
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
   * Load translations in format { key: { [locale]: value } }
   *
   * @param locales
   * @param namespaces
   */
  static loadTranslations(locales: string[], namespaces: string[]) {
    const result: any = {};

    for (const locale of locales) {
      for (const namespace of namespaces) {
        const filePath = this.resolveFilePath(locale, namespace);
        const translations = this.flattenTranslations(this.loadFile(filePath));

        for (const key of Object.keys(translations)) {
          result[namespace + ':' + key] ??= {};
          result[namespace + ':' + key][locale] = translations[key];
        }
      }
    }

    return result;
  }
}
