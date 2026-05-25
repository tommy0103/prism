import { createApp, reactive, type App, type Component } from 'vue'

import PDecision from './components/PDecision.vue'
import PCallout from './components/PCallout.vue'
import PCollapse from './components/PCollapse.vue'
import PCollapseGroup from './components/PCollapseGroup.vue'
import PSource from './components/PSource.vue'
import PRef from './components/PRef.vue'
import PMetrics from './components/PMetrics.vue'
import PMetric from './components/PMetric.vue'
import PBars from './components/PBars.vue'
import PBar from './components/PBar.vue'
import PStackedBar from './components/PStackedBar.vue'
import PSteps from './components/PSteps.vue'
import PStep from './components/PStep.vue'
import PFlow from './components/PFlow.vue'
import PFlowNode from './components/PFlowNode.vue'
import PFlowArrow from './components/PFlowArrow.vue'
import PCompare from './components/PCompare.vue'
import PCard from './components/PCard.vue'
import PCode from './components/PCode.vue'
import PBadge from './components/PBadge.vue'
import PTag from './components/PTag.vue'
import PKv from './components/PKv.vue'
import PDivider from './components/PDivider.vue'
import PGrid from './components/PGrid.vue'
import PFileList from './components/PFileList.vue'
import PChecklist from './components/PChecklist.vue'
import PCheckItem from './components/PCheckItem.vue'
import PTabs from './components/PTabs.vue'
import PTab from './components/PTab.vue'
import PPages from './components/PPages.vue'
import PPage from './components/PPage.vue'
import PCopy from './components/PCopy.vue'
import PParams from './components/PParams.vue'
import PParam from './components/PParam.vue'

import './styles/base.css'
import './styles/themes/notion.css'
import 'highlight.js/styles/github.css'
import './hljs'
import { createToc } from './toc'

const components: Record<string, Component> = {
  PDecision,
  PCallout,
  PCollapse,
  PCollapseGroup,
  PSource,
  PRef,
  PMetrics,
  PMetric,
  PBars,
  PBar,
  PStackedBar,
  PSteps,
  PStep,
  PFlow,
  PFlowNode,
  PFlowArrow,
  PCompare,
  PCard,
  PCode,
  PBadge,
  PTag,
  PKv,
  PDivider,
  PGrid,
  PFileList,
  PChecklist,
  PCheckItem,
  PTabs,
  PTab,
  PPages,
  PPage,
  PCopy,
  PParams,
  PParam,
}

function mount(el: string | HTMLElement): App {
  const element = typeof el === 'string' ? document.querySelector(el) : el
  if (!element) throw new Error(`PrismUI: element "${el}" not found`)

  const template = element.innerHTML
  element.innerHTML = ''

  const params = reactive<Record<string, any>>({})

  const app = createApp({
    template,
    setup() {
      return { params }
    },
  })
  for (const [name, comp] of Object.entries(components)) {
    app.component(name, comp)
  }
  app.provide('prism-root-params', params)
  app.mount(element)
  createToc(element as HTMLElement)
  return app
}

function setTheme(theme: 'light' | 'dark' | 'auto') {
  if (theme === 'auto') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', theme)
  }
}

export { mount, setTheme, components }

if (typeof window !== 'undefined') {
  ;(window as any).PrismUI = { mount, setTheme, components }
}
