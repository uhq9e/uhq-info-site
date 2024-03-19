<template>
  <div class="flex flex:col">
    <PageTitle value="是勇者系列Logo生成器" />

    <div class="flex-grow:1 flex ai:center">
      <div class="flex flex:col ai:center w:full">
        <div>
          <div class="flex flex:wrap jc:center ai:center gap:4 mb:12">
            <div class="flex flex:wrap jc:center gap:4">
              <InputText v-model="firstLine" placeholder="第一行" />
              <InputText v-model="secondLine" placeholder="第二行" />
            </div>
            <Button @click="onGenerate" :loading="loading">生成</Button>
          </div>
          <div class="flex flex:wrap jc:center gap-x:16 gap-y:4 mb:16">
            <div class="flex gap:8">
              <Dropdown
                v-model="selectedSeries"
                :options="options"
                optionLabel="name"
                optionValue="value"
                placeholder="选择系列"
                checkmark
              />
              <div class="flex gap:4 ai:center">
                <Checkbox
                  inputId="is_vertical"
                  v-model="isVertical"
                  :binary="true"
                />
                <label for="is_vertical">纵向</label>
              </div>
            </div>
            <div class="flex gap:4">
              <Button @click="onSave" label="PNG" icon="pi pi-download" />
            </div>
          </div>
        </div>
        <div v-html="svgStr" class="w:full flex jc:center max-h:50vh_*"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import Dropdown from "primevue/dropdown";

import { LogoGenerator, nowayu, kumeyu } from "dearu-logo-generator";
import type { IHighlightRange } from "dearu-logo-generator/types/lib/types/shared";

// 跳转到工具站
await navigateTo("https://tools.wakachika.love", { external: true });

const { t } = useI18n();

const pageTitle = pageTitleFormat("是勇者系列Logo生成器");
const pageDescription = "";
const pageImage = `${SiteData.host}/images/logogenerator_hero.webp`;

useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  twitterTitle: pageTitle,
  description: pageDescription,
  ogDescription: pageDescription,
  twitterDescription: pageDescription,
  ogImage: pageImage,
  twitterImage: pageImage,
});

const loading = ref(false);
const isVertical = ref(false);

const options = ref([
  { name: t("dearuSeries.nowayu"), value: nowayu },
  { name: t("dearuSeries.kumeyu"), value: kumeyu },
]);

const selectedSeries = ref(options.value[0].value);

const firstLine = ref("乃木若葉は");
const secondLine = ref("勇者である");

let generatedFirstLine: string | null = null;
let generatedSecondLine: string | null = null;

const lg = new LogoGenerator(selectedSeries.value);

const svgEl = ref(await generate());
const svgStr = computed(() => svgEl.value.outerHTML);

function onGenerate() {
  loading.value = true;

  generate().then((svg) => {
    svgEl.value = svg;
    loading.value = false;
  });
}

async function generate(): Promise<SVGSVGElement> {
  generatedFirstLine = firstLine.value;
  generatedSecondLine = secondLine.value;

  const [[fl, sl], highlights] = parseHightlightsFromLines([
    firstLine.value,
    secondLine.value,
  ]);

  return await lg.generate(fl, sl, highlights.length ? highlights : undefined);
}

function getDirectionByBool(isVertical: boolean) {
  return isVertical ? "vertical" : "horizontal";
}

function parseHightlightsFromLines(
  lines: string[]
): [string[], IHighlightRange[]] {
  const re = /\[(.*?)\]/g;

  let resultHighlights: IHighlightRange[] = [];
  let resultLines: string[] = [];

  lines.forEach((line, i) => {
    resultLines.push(line.replace(/[\[\]]/g, ""));

    for (const match of line.matchAll(re)) {
      const len = match[1].length;
      if (len !== 0) {
        const realIndex =
          match.index! -
          Array.from(match.input!.slice(0, match.index!)).reduce(
            (a, b) => a + Number(["[", "]"].includes(b)),
            0
          );
        resultHighlights.push({
          start: realIndex,
          end: realIndex + (len - 1),
          line: i as 0 | 1,
        });
      }
    }
  });

  return [resultLines, resultHighlights];
}

function onSave() {
  const img = new Image();
  img.src = `data:image/svg+xml;base64,${btoa(svgStr.value)}`;
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = svgEl.value.viewBox.baseVal.width;
    canvas.height = svgEl.value.viewBox.baseVal.height;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `${generatedFirstLine}_${generatedSecondLine}.png`;
    a.click();
  };
}

watch(selectedSeries, () => lg.setMeta(selectedSeries.value));

watch([isVertical, selectedSeries], ([v, ser]) => {
  lg.setDirection(getDirectionByBool(v));
  lg.setMeta(ser);

  loading.value = true;

  generate().then((svg) => {
    svgEl.value = svg;
    loading.value = false;
  });
});

watch([firstLine, secondLine], () => onGenerate());
</script>
