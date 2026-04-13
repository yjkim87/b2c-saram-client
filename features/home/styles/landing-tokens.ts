export const landingSectionTokens = {
  base:
    "px-[var(--landing-space-section-x)] py-[var(--landing-space-section-y)] sm:px-[var(--landing-space-section-x-sm)] md:py-[var(--landing-space-section-y-md)] lg:px-[var(--landing-space-section-x-lg)]",
  roomy:
    "px-[var(--landing-space-section-x)] py-[var(--landing-space-section-y-lg)] sm:px-[var(--landing-space-section-x-sm)] md:py-[var(--landing-space-section-y-lg)] lg:px-[var(--landing-space-section-x-lg)]",
} as const

export const landingLayoutTokens = {
  containerWide: "mx-auto max-w-[var(--landing-container-wide)]",
  containerMedium: "mx-auto max-w-[var(--landing-container-medium)]",
  containerNarrow: "mx-auto max-w-[var(--landing-container-narrow)]",
  sectionHeaderGap:
    "mb-[var(--landing-space-header-gap)] md:mb-[var(--landing-space-header-gap-md)]",
} as const

export const landingTypeTokens = {
  eyebrow:
    "font-sans text-[18px] font-bold leading-[1] tracking-[0] text-[#F07C33]",
  heroTitle:
    "text-[length:var(--landing-font-title-hero)] font-bold leading-[1.2] tracking-[-0.02em]",
  displayTitle:
    "text-[length:var(--landing-font-title-display)] font-extrabold leading-[1.2] tracking-[-0.02em]",
  sectionTitle:
    "font-sans text-[length:var(--landing-font-title-section)] font-bold leading-[1.25] tracking-[0] text-[#1A1410]",
  reviewTitle:
    "font-sans text-[length:var(--landing-font-title-review)] font-bold leading-[1.25] tracking-[0] text-[#1A1410]",
  cardTitle:
    "text-[length:var(--landing-font-title-card)] font-extrabold leading-none tracking-[-0.02em]",
  stepTitle:
    "text-[length:var(--landing-font-title-step)] font-extrabold leading-none tracking-[-0.02em]",
  stepTitleLg:
    "text-[length:var(--landing-font-title-step-lg)] font-extrabold leading-none tracking-[-0.02em]",
  ageCardTitle:
    "font-sans text-[length:var(--landing-font-title-age-card)] font-bold leading-[1] tracking-[0]",
  serviceCardTitle:
    "font-sans text-[length:var(--landing-font-service-card-title)] font-bold leading-[1] tracking-[0]",
  serviceCardNote:
    "font-sans text-[length:var(--landing-font-service-note)] font-normal leading-[1] tracking-[0] text-[#7A6656]",
  noteText:
    "font-sans text-[length:var(--landing-font-service-note)] font-normal leading-[1] tracking-[0]",
  mapButton:
    "font-sans text-[length:var(--landing-font-map-button)] md:text-[length:var(--landing-font-map-button-md)] font-bold leading-[1] tracking-[0]",
  stepDescription:
    "font-sans text-[length:var(--landing-font-step-description)] font-normal leading-[1] tracking-[0]",
  ageRangeLabel:
    "font-sans text-[length:var(--landing-font-age-range-label)] font-bold leading-[1] tracking-[0]",
  stepNumberSm:
    "text-[length:var(--landing-font-step-number-sm)] font-extrabold leading-none",
  stepNumberLg:
    "text-[length:var(--landing-font-step-number-lg)] font-extrabold leading-none",
  body: "text-[length:var(--landing-font-body)] leading-[var(--landing-leading-body)]",
  bodySm:
    "text-[length:var(--landing-font-body-sm)] leading-[var(--landing-leading-body)]",
  bodyRelaxed:
    "text-[length:var(--landing-font-body)] leading-[var(--landing-leading-body-relaxed)]",
  chip: "text-[length:var(--landing-font-chip)] font-bold",
  button: "text-[length:var(--landing-font-button)] font-semibold",
  buttonLg: "text-[length:var(--landing-font-button-lg)] font-semibold",
  tabLabel:
    "text-[length:var(--landing-font-tab)] font-extrabold leading-none tracking-[-0.02em]",
} as const

export const landingRadiusTokens = {
  card: "rounded-[var(--landing-radius-card)]",
  cardLg: "rounded-[var(--landing-radius-card-lg)]",
  note: "rounded-[var(--landing-radius-note)]",
  mapButton: "rounded-[var(--landing-radius-map-button)]",
  pill: "rounded-[var(--landing-radius-pill)]",
  circle: "rounded-[var(--landing-radius-circle)]",
} as const

export const landingSpaceTokens = {
  cardPadding: "p-[var(--landing-space-card)]",
  cardPaddingResponsive:
    "p-[var(--landing-space-card-sm)] md:p-[var(--landing-space-card)]",
  cardPaddingLarge: "p-[var(--landing-space-card-lg)]",
  buttonPadding:
    "px-[var(--landing-space-button-x)] py-[var(--landing-space-button-y)]",
  buttonPaddingLg:
    "px-[var(--landing-space-button-lg-x)] py-[var(--landing-space-button-lg-y)]",
  notePadding: "px-[var(--landing-space-note-x)] py-[var(--landing-space-note-y)]",
  mapButtonPadding:
    "px-[var(--landing-space-map-button-x)] py-[var(--landing-space-map-button-y)] md:px-[var(--landing-space-map-button-x-md)] md:py-[var(--landing-space-map-button-y-md)]",
  mapButtonHeight: "h-[var(--landing-size-map-button-height)]",
  chipPadding:
    "px-[var(--landing-space-chip-x)] py-[var(--landing-space-chip-y)]",
  tabGap: "gap-[var(--landing-space-tab-gap)]",
  tabButtonSpacing:
    "mb-[var(--landing-space-tab-offset-y)] px-[var(--landing-space-tab-padding-x)] pb-[var(--landing-space-tab-padding-bottom)]",
  gridGap: "gap-[var(--landing-space-grid-md)]",
  gridGapSmToMd:
    "gap-[var(--landing-space-grid-sm)] md:gap-[var(--landing-space-grid-md)]",
} as const
