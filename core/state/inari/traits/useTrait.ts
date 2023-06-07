// Define an interface for the Trait Configuration
interface TraitConfig {
  overrides?: string[];
}

// Define a general props interface that can be extended by components using this hook
interface Props {
  overrides?: string[];
  [key: string]: any; // Allows for any other properties
}

// Define BaseTrait that extends from Props
interface BaseTrait extends Props {
  overrides: string[];
}

// Define a type for the function signature of useTrait
type UseTraitFunction = (props: Props, config: TraitConfig) => BaseTrait;

// The function itself
const useTrait: UseTraitFunction = (props, { overrides = [] }) => {
  useEffect(() => {
    const intersection = overrides.filter((value) => (props.overrides || []).includes(value))
    if (intersection.length > 0) {
      throw new Error(`Multiple traits are overriding the same property: ${JSON.stringify(intersection)}`)
    }
  }, [overrides, props.overrides])

  return useMemo(
    () => ({
      ...props,
      overrides,
    }),
    [overrides, props]
  )
}

export default useTrait;
export type { UseTraitFunction, TraitConfig, Props, BaseTrait };
