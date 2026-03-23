import { InlineScript } from 'src/server'

export default function EntryNotExistPage() {
  return (
    <main>
      <title>Inline script entry not exist</title>
      <InlineScript nonce='hono' src='/mocks/app-inline-script/routes/-utils/inline-script-entry-not-exist.ts' />
    </main>
  )
}
