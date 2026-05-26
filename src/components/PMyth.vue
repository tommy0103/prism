<template>
  <div class="prism-myth">
    <div class="prism-myth-row prism-myth-myth">
      <span class="picon-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18h6"/>
          <path d="M10 22h4"/>
          <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/>
        </svg>
      </span>
      <div class="content"><slot name="myth" /></div>
    </div>
    <div class="prism-myth-row prism-myth-truth">
      <span class="picon-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </span>
      <div class="content"><slot name="truth" /></div>
    </div>
  </div>
</template>
