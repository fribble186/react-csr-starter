import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../locales/en.json";
import zh from "../locales/zh.json";

i18n
  // 👇 自动检测语言插件（必须在 initReactI18next 之前 use）
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      zh: { common: zh },
    },

    // 👇 不手动写 lng，让 detector 决定
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
    supportedLngs: ["en", "zh"],
        nonExplicitSupportedLngs: true,

    detection: {
      // 👇 检测语言来源优先级（从前往后）
      order: [
        "localStorage", // 用户之前手动选择的语言（优先）
        "navigator", // 浏览器系统语言
        "htmlTag", // <html lang="zh">
        "path", // URL 路径中 /zh/xx
        "subdomain", // zh.example.com
      ],

      // 👇 设置或保存语言的方式
      caches: ["localStorage"],

      // 👇 默认语言标签（兼容 zh-CN / zh）
      lookupLocalStorage: "i18nextLng",
      
    },
  });

export const { t } = i18n;
export default i18n;
