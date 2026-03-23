import { createRequire } from 'module'
import path from 'node:path'
import { access } from 'node:fs/promises'
import type { FC } from 'hono/jsx'
import type { JSX } from 'hono/jsx/jsx-runtime'

const require = createRequire(import.meta.url)
const projectRoot = process.cwd()

const inlineScriptCodeCache = new Map<string, Promise<string>>()

export const bundleInlineScript = async (src?: string) => {
  if (!src) {
    throw new Error('InlineScript src must be provided.')
  }

  if (src.startsWith('/')) {
    const projectRelativePath = src.replace(/^\/+/, '')
    src = path.resolve(projectRoot, projectRelativePath)
  } else {
    throw new Error(
      `InlineScript src must be an absolute path from the project root. Relative paths are not supported: ${src}`
    )
  }

  const entryFile = src
  try {
    await access(entryFile)
  } catch {
    throw new Error(`InlineScript src entry file not found: ${entryFile}`)
  }

  const cached = inlineScriptCodeCache.get(entryFile)

  if (cached) {
    return cached
  }

  // esbuild is a CommonJS module, so we need to use `require` to load it.
  const esbuild = require('esbuild') as typeof import('esbuild')
  const promise = esbuild
    .build({
      absWorkingDir: projectRoot,
      entryPoints: [entryFile],
      bundle: true,
      format: 'iife',
      platform: 'browser',
      write: false,
      target: 'es2019',
      minify: true,
      sourcemap: false,
    })
    .then((result) => result.outputFiles[0]?.text ?? '')

  inlineScriptCodeCache.set(entryFile, promise)

  return promise
}

type InlineScriptProps = Omit<
  JSX.IntrinsicElements['script'],
  'children' | 'dangerouslySetInnerHTML'
> & {
  src?: string
}

export const InlineScript: FC<InlineScriptProps> = async ({ src, ...rest }) => {
  const code = await bundleInlineScript(src)

  return <script {...rest} dangerouslySetInnerHTML={{ __html: code }}></script>
}
