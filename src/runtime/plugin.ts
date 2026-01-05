import { algoliasearch } from 'algoliasearch'
import { liteClient } from 'algoliasearch/lite'
import { defineNuxtPlugin, useRuntimeConfig } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const { applicationId, apiKey, lite, recommend } = useRuntimeConfig().public.algolia

  const client = lite
    ? liteClient(applicationId, apiKey)
    : algoliasearch(applicationId, apiKey)

  nuxtApp.provide('algolia', client)

  if (recommend) {
    nuxtApp.provide('algoliaRecommend', client)
  }
})
