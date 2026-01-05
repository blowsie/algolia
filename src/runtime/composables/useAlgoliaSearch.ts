import { computed, onUnmounted } from 'vue'
import type { ComputedRef } from 'vue'
import type { AlgoliaIndices, RequestOptionsObject, SearchResponse } from '../../types'
import { useAlgoliaInitIndex } from './useAlgoliaInitIndex'
import { useState, useRuntimeConfig, useNuxtApp } from '#imports'

export type SearchParams = { query: string } & RequestOptionsObject;

export type UseSearchReturnType<T> = {
  result: ComputedRef<SearchResponse<T>>,
  search: (params: SearchParams) => Promise<SearchResponse<T>>,
}

export function useAlgoliaSearch<K extends keyof AlgoliaIndices>(indexName?: K): UseSearchReturnType<AlgoliaIndices[K]>
export function useAlgoliaSearch<T>(indexName?: string): UseSearchReturnType<T>
export function useAlgoliaSearch (indexName?: string) {
  const config = useRuntimeConfig()
  const index = indexName || config.public.algolia.globalIndex

  if (!index) { throw new Error('`[@nuxtjs/algolia]` Cannot search in Algolia without `globalIndex` or `indexName` passed as a parameter') }

  const algoliaIndex = useAlgoliaInitIndex(index)
  const result = useState(`${index}-search-result`, () => null)

  const search = async ({ query, requestOptions }: SearchParams) => {
    const searchResult = await algoliaIndex.search(query, requestOptions)
    result.value = searchResult
    return searchResult
  }

  onUnmounted(() => {
    result.value = null
  })

  return {
    result: computed(() => result.value),
    search
  }
}
