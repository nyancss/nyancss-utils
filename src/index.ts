import { NyanCSSMap } from '@nyancss/types'

const booleanPropRegEx = /^(\w+)-(\w+)$/

export function tryApplyBooleanProp(
  map: NyanCSSMap,
  className: string,
  processedClassName?: string
) {
  const booleanPropCaptures = className.match(booleanPropRegEx)
  if (booleanPropCaptures) {
    const [, componentName, propName] = booleanPropCaptures
    applyComponent(map, componentName)

    const prop = map[componentName].props[propName]
    if (!prop) {
      map[componentName].props[propName] = {
        propName,
        type: 'boolean',
        className: processedClassName || className
      }
    } else if (prop && prop.type === 'enum') {
      prop.values.push(true)
      prop.classNames.true = processedClassName || className
    }
    return true
  }
  return false
}

const enumPropRegEx = /^(\w+)-(\w+)-(\w+)$/

export function tryApplyEnumProp(
  map: NyanCSSMap,
  className: string,
  processedClassName?: string
) {
  const enumPropCaptures = className.match(enumPropRegEx)
  if (enumPropCaptures) {
    const [, componentName, propName, value] = enumPropCaptures
    applyComponent(map, componentName)

    let prop = map[componentName].props[propName]
    if (!prop) {
      prop = map[componentName].props[propName] = {
        propName,
        type: 'enum',
        values: [],
        classNames: {}
      }
    } else if (prop.type === 'boolean') {
      prop = map[componentName].props[propName] = {
        propName,
        type: 'enum',
        values: [true],
        classNames: {
          true: prop.className
        }
      }
    }

    prop.values.push(value)
    prop.classNames[value] = processedClassName || className
    return true
  }
  return false
}

export function applyComponent(
  map: NyanCSSMap,
  componentName: string,
  className?: string
) {
  map[componentName] =
    map[componentName] || emptyComponent(componentName, className)
  if (!map[componentName].className && className)
    map[componentName].className = className
}

function emptyComponent(componentName: string, className: string | undefined) {
  return {
    componentName,
    tag: undefined,
    className,
    props: {}
  }
}
