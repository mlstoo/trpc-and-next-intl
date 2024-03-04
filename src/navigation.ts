import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['en', 'de', 'cn', 'ar', 'dk', 'es', 'fi','fr', 'it', 'jp', 'kr', 'nl', 'no', 'pl', 'pt', 'ru',  'se', 'th', 'vn', 'tr'] as const;
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales});
