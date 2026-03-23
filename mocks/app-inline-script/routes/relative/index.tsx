import { InlineScript } from 'src/server'

export default function RelativePathPage() {
  return (
    <main>
      <title>Inline script relative path</title>
      <InlineScript nonce='hono' src='../-utils/inline-script-entry.ts' />
    </main>
  )
}
