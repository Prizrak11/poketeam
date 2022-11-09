import { useEffect, useRef, useState } from 'react'
import tippy, { Instance, Props, roundArrow } from 'tippy.js'
import '../mixins/tooltip.css'
import 'tippy.js/themes/translucent.css'
import 'tippy.js/dist/svg-arrow.css'

export interface tooltipReturn {
  ref: React.MutableRefObject<null>
  unmount: () => void
  update: (value: string | null) => void
}

const useTooltip = (initialContent: string): tooltipReturn => {
  const [tooltip, setTooltip] = useState<Instance<Partial<Props>> | null>(null)
  const elementRef = useRef(null)

  const props = {
    hideOnClick: true,
    arrow: roundArrow,
    theme: 'custom',
    delay: 0
  }

  let called = false

  useEffect(() => {
    if (elementRef?.current === null || tooltip !== null) return
    if (called) return
    const instance = tippy(elementRef.current, {
      content: initialContent === '' ? undefined : initialContent,
      ...props
    })
    called = true
    if (Array.isArray(instance)) return setTooltip(instance[0])
    setTooltip(instance)
  }, [elementRef.current])

  const update = (value: string | null): void => {
    if (value == null || tooltip == null) return

    tooltip.setProps({
      ...props,
      content: value
    })
  }

  const unmount = (): void => {
    if (tooltip == null) return

    tooltip.destroy()
  }

  return {
    ref: elementRef,
    unmount,
    update
  }
}

export default useTooltip
