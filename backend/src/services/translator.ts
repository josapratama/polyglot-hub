/**
 * Auto-translation engine with free public translation API fallbacks
 */
export async function autoTranslateText(
  text: string,
  fromLang: string,
  toLang: string
): Promise<string> {
  if (!text || !text.trim()) return "";
  if (fromLang === toLang) return text;

  try {
    // 1. Primary: MyMemory Free Translation API
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${fromLang}|${toLang}`;
    const res = await fetch(url, { headers: { "User-Agent": "PolyglotHub/1.0" } });
    if (res.ok) {
      const data: any = await res.json();
      if (data?.responseData?.translatedText) {
        return data.responseData.translatedText;
      }
    }
  } catch (err) {
    console.warn("MyMemory translation error, attempting fallback...", err);
  }

  try {
    // 2. Secondary fallback: Google Translate single endpoint
    const gUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(
      text
    )}`;
    const res = await fetch(gUrl);
    if (res.ok) {
      const data: any = await res.json();
      if (data && Array.isArray(data[0])) {
        return data[0].map((item: any) => item[0]).join("");
      }
    }
  } catch (err) {
    console.error("All translation services failed:", err);
  }

  // Fallback to original text if offline or unreachable
  return text;
}
