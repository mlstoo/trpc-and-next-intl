import { notFound } from 'next/navigation';
import { trpc } from './utils/trpc';

type Locale = "en" | "de" | "cn" | "ar" | "dk" | "es" | "fi" | "fr" | "it" | "jp" | "kr" | "nl" | "no" | "pl" | "pt" | "ru" | "se" | "th" | "vn" | "tr";

const locales: Locale[] = ["en", "de", "cn", "ar", "dk", "es", "fi", "fr", "it", "jp", "kr", "nl", "no", "pl", "pt", "ru", "se", "th", "vn", "tr"];

export default async function getRequestConfig({ locale }: { locale: string }) {
  if (!locales.includes(locale as Locale)) return notFound();
  const messagesResponse = await trpc.translate.getMessages.useQuery({ locale: locale as Locale });
  const messages = messagesResponse.data?.reduce((acc: Record<string, string>, { translationKeyId, value }) => ({ ...acc, [translationKeyId]: value }), {}) || {};
  return { messages };
}
