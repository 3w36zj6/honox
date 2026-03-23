import { InlineScript } from 'src/server'

export default function AbsolutePathPage() {
  return (
    <main>
      <title>Inline script absolute path</title>
      <InlineScript nonce='hono' src='/mocks/app-inline-script/routes/-utils/inline-script-entry.ts' />
    </main>
  )
}
