#!/usr/bin/env node
import { I18nFileEditor } from '@/shared/i18n-file-editor';

const editor = I18nFileEditor.loadFromConfig();
editor.buildKeyFile().catch(console.error);
