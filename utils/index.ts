import type { DataTableSortMeta } from "primevue/datatable";

import { useToast } from "primevue/usetoast";
import type { ToastServiceMethods } from "primevue/toastservice";

export function formatDate(
  date: Date | null | undefined
): string | null | undefined {
  if (!date) return date;
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function urlToFavicon(url: string): string | undefined {
  const urlRegex =
    /^(https?:\/\/(?:[a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+\.\w+)\/*\S*/;
  const matched = urlRegex.exec(url);
  return matched !== null ? `${matched[1]}/favicon.ico` : undefined;
}

export function urlToHostname(url: string): string | undefined {
  const regex =
    /^https?:\/\/(?:[a-zA-Z0-9_-]+\.)*([a-zA-Z0-9_-]+)\.\w{2,6}\/?\S*/;
  const result = regex.exec(url);
  return result ? result[1] : undefined;
}

export async function validateToken(token: string): Promise<boolean> {
  let resp = await $fetch.raw("/api/auth/validate_token", {
    method: "POST",
    body: token,
    ignoreResponseError: true,
  });
  return resp.status === 200 ? true : false;
}

export function pageTitleFormat(str: string | undefined): string {
  if (!str) return "若千人的末路";
  return `${str} | 若千人的末路`;
}

export function sortMetaToFormat(meta: DataTableSortMeta): string {
  return `${(meta.order ?? 1) >= 0 ? "+" : "-"}${meta.field}`;
}

export function sortMetaArrayToFormat(metaArr: DataTableSortMeta[]): string {
  return metaArr.map((v) => sortMetaToFormat(v)).join(",");
}

export function statusHandler(status: number, success?: Function) {
  const { t } = useI18n();

  switch (status) {
    case 200:
      if(success) success();
      Toast.success(t("shared.confirmed"), t("messages.successfulOperation"));
      break;

    case 403:
      Toast.error(t("shared.error"), t("requestErrors.status.403"));
      break;

    case 404:
      Toast.error(t("shared.error"), t("requestErrors.status.404"));
      break;

    default:
      Toast.error(t("shared.error"), t("requestErrors.status.500"));
      break;
  }
}

export class SiteData {
  static readonly host = "https://blog.wakachika.love";
  static readonly hostDev = "http://localhost:3000";
  static readonly objectUrlPrefix = "https://object.wakachika.love/";

  public static objectUrl(path: string | undefined): string | undefined {
    if (!path) return path;
    return `${this.objectUrlPrefix}${path}`;
  }
}

export class Toast {
  static readonly toastLife = 3000;

  public static success(summary?: string, detail?: any) {
    const toast = useToast();
    toast.add({
      severity: "success",
      summary,
      detail,
      life: this.toastLife,
    });
  }

  public static info(summary?: string, detail?: any) {
    const toast = useToast();
    toast.add({
      severity: "info",
      summary,
      detail,
      life: this.toastLife,
    });
  }

  public static warn(summary?: string, detail?: any) {
    const toast = useToast();
    toast.add({
      severity: "warn",
      summary,
      detail,
      life: this.toastLife,
    });
  }

  public static error(summary?: string, detail?: any) {
    const toast = useToast();
    toast.add({
      severity: "error",
      summary,
      detail,
      life: this.toastLife,
    });
  }
}
