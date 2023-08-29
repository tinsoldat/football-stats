export function useDebounce<T>(value: Ref<T>, timeout = 300) {
  const internal = ref<T>()
  const timer = setTimeout(
    () => (internal.value = isRef(value) ? value.value : value),
    timeout
  )
  onUnmounted(() => clearTimeout(timer))
  return
}
