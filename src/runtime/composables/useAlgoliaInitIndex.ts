import type { AlgoliaIndices, TypedSearchIndex } from '../../types'
import { useAlgoliaRef } from './useAlgoliaRef'

export function useAlgoliaInitIndex<T extends keyof AlgoliaIndices>(indexName: T): TypedSearchIndex<T>
export function useAlgoliaInitIndex(indexName: string) {
  const algolia = useAlgoliaRef()

  return {
    search: async (query: string, requestOptions: any = {}) => {
      const { results } = await algolia.search({
        requests: [
          {
            indexName,
            query,
            ...requestOptions
          }
        ]
      })

      return results[0]
    },
    searchForFacetValues: async (facetName: string, facetQuery: string, requestOptions: any = {}) => {
      const { results } = await algolia.searchForFacetValues({
        requests: [
          {
            indexName,
            params: {
              facetName,
              facetQuery,
              ...requestOptions
            }
          }
        ]
      })

      return results[0]
    }
  }
}
