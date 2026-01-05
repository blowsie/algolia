import { useNuxtApp } from '#imports'

export const useAlgoliaRef = () => {
  const nuxtApp = useNuxtApp()
  const algolia: Record<string, any> = nuxtApp.$algolia

  return algolia
}
