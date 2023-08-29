export function useDebounce<T>(value: Ref<T>, timeout = 300) {
  const internal = ref<T>()
  let timer: ReturnType<typeof setTimeout>
  watch(
    () => value.value,
    () => {
      clearTimeout(timer)
      timer = setTimeout(
        () => (internal.value = isRef(value) ? value.value : value),
        timeout
      )
    }
  )
  onUnmounted(() => clearTimeout(timer))
  return internal
}
