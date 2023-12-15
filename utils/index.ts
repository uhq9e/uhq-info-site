import type { DataTableSortMeta } from "primevue/datatable";

import { useToast } from "primevue/usetoast";

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

export function pageTitleFormat(str: string): string {
  return `${str} | 若千人的末路`;
}

export function sortMetaToFormat(meta: DataTableSortMeta): string {
  return `${(meta.order ?? 1) >= 0 ? "+" : "-"}${meta.field}`;
}

export function sortMetaArrayToFormat(metaArr: DataTableSortMeta[]): string {
  return metaArr.map((v) => sortMetaToFormat(v)).join(",");
}

export function statusHandler(status: number, success: Function) {
  const toast = useToast();
  const { t } = useI18n();

  switch (status) {
    case 200:
      success();
      toast.add({
        severity: "info",
        summary: t("shared.confirmed"),
        detail: t("messages.successfulOperation"),
        life: 3000,
      });
      break;

    case 403:
      toast.add({
        severity: "error",
        summary: t("shared.error"),
        detail: t("requestErrors.status.403"),
        life: 3000,
      });
      break;

    case 404:
      toast.add({
        severity: "error",
        summary: t("shared.error"),
        detail: t("requestErrors.status.404"),
        life: 3000,
      });
      break;

    default:
      toast.add({
        severity: "error",
        summary: t("shared.error"),
        detail: t("requestErrors.status.404"),
        life: 3000,
      });
      break;
  }
}

export class siteData {
  static readonly host = "https://object.wakachika.love/";
  static readonly objectUrlPrefix = siteData.host;

  public static objectUrl(path: string): string {
    return `${this.objectUrlPrefix}${path}`;
  }
}
