import { prisma } from '../lib/prisma';

async function getTranslationsGroupedByParent(localeCode: string): Promise<Record<string, any>> {
  const translations = await prisma.translationKey.findMany({
    where: {
      translations: {
        some: {
          localeCode: localeCode,
        },
      },
    },
    include: {
      parent: true,
      translations: {
        where: {
          localeCode: localeCode,
        },
        include: {
          translationKey: true, 
        },
      },
    },
  });

  const messages = translations.reduce<Record<string, any>>((acc, { parent, translations }) => {
    const parentKey = parent?.key || 'default';
    if (!acc[parentKey]) {
      acc[parentKey] = {};
    }
    translations.forEach(({ translationKey, value }) => {
      acc[parentKey][translationKey.key] = value; 
    });
    return acc;
  }, {});

  return messages;
}

export default getTranslationsGroupedByParent;