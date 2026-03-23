import { InlineScript } from 'src/server'

export default function EntryNotProvidedPage() {
  return (
    <main>
      <title>Inline script entry not provided</title>
      <InlineScript nonce='hono' />
    </main>
  )
}
