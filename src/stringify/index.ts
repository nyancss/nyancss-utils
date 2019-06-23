import { NyanCSSComponent, NyanCSSProp } from '@nyancss/types'
import { NyanCSSStringifyProps } from '../types'

export function getClassName(
  component: NyanCSSComponent,
  props: NyanCSSStringifyProps,
  extraClassName?: string
) {
  const componentPropsClassNames =
    props &&
    Object.keys(component.props).reduce(
      (acc, componentPropName) => {
        const componentProp = component.props[componentPropName]
        const propValue = props[componentPropName]
        return acc.concat(findModifierClassName(componentProp, propValue) || [])
      },
      [] as string[]
    )
  return classesToString(
    [component.className]
      .concat(componentPropsClassNames)
      .concat(extraClassName)
  )
}

function findModifierClassName(componentProp: NyanCSSProp, propValue: any) {
  switch (componentProp.type) {
    case 'boolean':
      if (propValue) return componentProp.className
      break

    case 'enum':
      return componentProp.classNames[propValue]
  }
}

function classesToString(classes: Array<string | undefined>) {
  return classes.filter(c => !!c).join(' ')
}
