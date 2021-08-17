import React, { useEffect, useRef, useState } from 'react'

export interface useDynamicsSVGImportOptions {
  onCompleted?: (name: string, SvgIcon: React.FC<React.SVGProps<SVGSVGElement>> | null) => void
  onError?: (err: Error) => void
}

const useDynamicsSVGImport = (name: string, options: useDynamicsSVGImportOptions = {}) => {
  const ImportedIconRef = useRef<React.FC<React.SVGProps<SVGSVGElement>>>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error>()

  const { onCompleted, onError } = options
  useEffect(() => {
    setLoading(true)
    const importIcon = async (): Promise<void> => {
      try {
        ImportedIconRef.current = (await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!../../../../node_modules/cryptocurrency-icons/svg/color/${name}.svg`)).default
        onCompleted?.(name, ImportedIconRef.current)
      } catch (err) {
        onError?.(err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    importIcon()
  }, [name, onCompleted, onError])

  return { error, loading, SvgIcon: ImportedIconRef.current }
}

export default useDynamicsSVGImport
