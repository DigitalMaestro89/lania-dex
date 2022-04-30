import React, { ReactNode, RefObject, useMemo, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

import useAppSettings from '@/application/appSettings/useAppSettings'
import { shrinkToValue } from '@/functions/shrinkToValue'

import HDrawer, { DrawerPlacement } from './HDrawer'
import Popover, { PopoverPlacement } from './Popover'
import { PopupLocationInfo } from './Popover/useLocationCalculator'

/**
 * for PageLayout
 * don't be a uikit, for it's not very elegant
 */
export default function PageLayoutPopoverDrawer({
  children,
  renderPopoverContent,
  popupPlacement = 'right',
  drawerPlacement = 'from-bottom',
  alwaysDrawer,
  alwaysPopper,
  canOpen = true,
  forceOpen
}: {
  children?: ReactNode
  renderPopoverContent?: ReactNode | ((controller: { close: () => void }) => ReactNode)
  popupPlacement?: PopoverPlacement
  drawerPlacement?: DrawerPlacement
  alwaysDrawer?: boolean
  alwaysPopper?: boolean
  canOpen?: boolean
  forceOpen?: boolean
}) {
  const isMobile = useAppSettings((s) => s.isMobile)
  const shouldBeDrawer = useMemo(
    () => (alwaysPopper == null && alwaysDrawer == null ? isMobile : !alwaysPopper && alwaysDrawer),
    [alwaysPopper, alwaysDrawer, isMobile]
  )
  return shouldBeDrawer ? (
    <HDrawer placement={drawerPlacement} canOpen={canOpen}>
      <HDrawer.Button>{children}</HDrawer.Button>
      <HDrawer.Panel>
        {({ close }) => (
          <SmartBubbleDrawerPanel>{shrinkToValue(renderPopoverContent, [{ close }])}</SmartBubbleDrawerPanel>
        )}
      </HDrawer.Panel>
    </HDrawer>
  ) : (
    <Popover placement={popupPlacement} forceOpen={forceOpen} canOpen={canOpen} cornerOffset={20}>
      <Popover.Button>{children}</Popover.Button>
      <Popover.Panel>
        {({ close, placement, locationInfo }) => (
          <SmartBubblePanel arrowLocationInfo={locationInfo} panelPlacement={placement}>
            {shrinkToValue(renderPopoverContent, [{ close }])}
          </SmartBubblePanel>
        )}
      </Popover.Panel>
    </Popover>
  )
}

function SmartBubbleDrawerPanel({ children }: { children?: ReactNode }) {
  return (
    <div
      className="w-screen p-4 pb-6 rounded-tl-3xl rounded-tr-3xl"
      style={{
        background:
          'linear-gradient(140.14deg, #333333 0%, #1d39b9 86.61%), linear-gradient(321.82deg, rgb(24, 19, 77) 0%, rgb(27, 22, 89) 100%)'
      }}
    >
      {children}
    </div>
  )
}

function SmartBubblePanel({
  className,
  children,
  arrowLocationInfo,
  panelPlacement
}: {
  className?: string
  children?: ReactNode
  panelPlacement?: PopoverPlacement
  arrowLocationInfo?: Pick<PopupLocationInfo, 'arrowLeftRelativeToPanel' | 'arrowTopRelativeToPanel'>
}) {
  const panelDom = useRef<HTMLDivElement>(null)

  const arrowPosition = useMemo(() => {
    if (panelPlacement?.startsWith('left')) return 'right'
    if (panelPlacement?.startsWith('right')) return 'left'
    if (panelPlacement?.startsWith('top')) return 'bottom'
    if (panelPlacement?.startsWith('bottom')) return 'top'
    return 'right'
  }, [panelPlacement])

  const inlineSVG = useMemo(() => {
    if (!arrowLocationInfo || !panelDom.current)
      return `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect rx='20' width='100%' height='100%'/></svg>")`

    const { arrowLeftRelativeToPanel: arrowLeft, arrowTopRelativeToPanel: arrowTop } = arrowLocationInfo
    const panelWidth = panelDom.current?.clientWidth
    const panelHeight = panelDom.current?.clientHeight
    const isArrowVisiable =
      arrowPosition === 'left' || arrowPosition === 'right'
        ? 20 < arrowTop && arrowTop < panelHeight
        : 20 < arrowLeft && arrowLeft < panelWidth

    return arrowPosition === 'left'
      ? `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect rx='20' x='8' width='calc(100% - 9px)' height='100%'/>${
          arrowTop && isArrowVisiable ? `<polygon points='8,${arrowTop - 8} 0,${arrowTop} 8,${arrowTop + 8}' />` : ''
        }</svg>")`
      : arrowPosition === 'top'
      ? `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><rect rx='20' x='0' y='8' width='100%' height='calc(100% - 9px)'/>${
          arrowLeft && isArrowVisiable
            ? `<polygon points='${arrowLeft + 8},8 ${arrowLeft},0 ${arrowLeft - 8},8' />`
            : ''
        }</svg>")`
      : `haven't imply yet`
  }, [arrowLocationInfo, arrowPosition])

  return (
    <div
      style={{
        filter: 'drop-shadow(0px 8px 48px rgba(171, 196, 255, 0.12)) drop-shadow(0px 0px 2px rgba(171, 196, 255, 0.5))'
      }}
    >
      <div
        className={twMerge(
          arrowPosition?.startsWith('left')
            ? 'pl-2'
            : arrowPosition?.startsWith('top')
            ? 'pt-2'
            : arrowPosition?.startsWith('bottom')
            ? 'pb-2'
            : 'pr-2',
          className
        )}
        ref={panelDom}
        style={{
          background:
            'linear-gradient(140.14deg, #333333 0%, #1d39b9 86.61%), linear-gradient(321.82deg, rgb(24, 19, 77) 0%, rgb(27, 22, 89) 100%)',
          maskImage: inlineSVG,
          WebkitMaskImage: inlineSVG
        }}
      >
        {children}
      </div>
    </div>
  )
}
