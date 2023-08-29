export function useQueryFilter<T>(parse: (route: ReturnType<typeof useRoute>) => T) {
  const route = useRoute()
  return computed(() => parse(route))
}
