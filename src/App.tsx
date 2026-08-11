import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { RouterSidebarDemo } from '@/demo/integrations/router-sidebar-demo'
import { StateSidebarDemo } from '@/demo/integrations/state-sidebar-demo'

type DemoTab = 'router' | 'state'

/** Vite `base` ends with `/`; React Router basename must not. */
const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export default function App() {
  const [tab, setTab] = useState<DemoTab>('router')

  return (
    <div className="min-h-screen">
      <div className="fixed right-4 top-4 z-50 flex gap-1 rounded-lg border border-stone-300 bg-white p-1 shadow-sm">
        <TabButton active={tab === 'router'} onClick={() => setTab('router')}>
          Router demo
        </TabButton>
        <TabButton active={tab === 'state'} onClick={() => setTab('state')}>
          State demo
        </TabButton>
      </div>

      {tab === 'router' ? (
        <BrowserRouter basename={routerBasename}>
          <RouterSidebarDemo />
        </BrowserRouter>
      ) : (
        <StateSidebarDemo />
      )}
    </div>
  )
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'rounded-md bg-stone-900 px-3 py-1.5 text-sm font-medium text-white'
          : 'rounded-md px-3 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-100'
      }
    >
      {children}
    </button>
  )
}
