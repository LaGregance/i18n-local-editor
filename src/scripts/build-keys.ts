#!/usr/bin/env node
import { I18nManager } from '@/shared/i18n-manager';

I18nManager.buildKeyFile().catch(console.error);
