import { NyanCSSComponent } from '@nyancss/types'
import { getClassName } from '.'
describe('stringify utils', () => {
  describe('getClassName', () => {
    it('generates simple class name', () => {
      const component: NyanCSSComponent = {
        componentName: 'Component',
        tag: undefined,
        className: 'component-class',
        props: {}
      }
      expect(getClassName(component, {})).toEqual('component-class')
    })

    it('returns empty string if the component class name is not present', () => {
      const component: NyanCSSComponent = {
        componentName: 'Component',
        tag: undefined,
        className: undefined,
        props: {}
      }
      expect(getClassName(component, {})).toEqual('')
    })

    it('generates class name from boolean prop', () => {
      const component: NyanCSSComponent = {
        componentName: 'Component',
        tag: undefined,
        className: 'component-class',
        props: {
          active: {
            propName: 'active',
            type: 'boolean',
            className: 'component-active-class'
          }
        }
      }
      expect(getClassName(component, {})).toEqual('component-class')
      expect(getClassName(component, { active: true })).toEqual(
        'component-class component-active-class'
      )
    })

    it('generates class name from enum prop', () => {
      const component: NyanCSSComponent = {
        componentName: 'Component',
        tag: undefined,
        className: 'component-class',
        props: {
          color: {
            propName: 'color',
            type: 'enum',
            values: ['red', 'green'],
            classNames: {
              red: 'component-color-red-class',
              green: 'component-color-green-class'
            }
          }
        }
      }
      expect(getClassName(component, {})).toEqual('component-class')
      expect(getClassName(component, { color: 'green' })).toEqual(
        'component-class component-color-green-class'
      )
    })

    it('generates class name from enum prop with true value', () => {
      const component: NyanCSSComponent = {
        componentName: 'Component',
        tag: undefined,
        className: 'component-class',
        props: {
          padded: {
            propName: 'padded',
            type: 'enum',
            values: [true, 'small', 'large'],
            classNames: {
              true: 'component-padded-class',
              small: 'component-padded-small-class',
              large: 'component-padded-large-class'
            }
          }
        }
      }
      expect(getClassName(component, {})).toEqual('component-class')
      expect(getClassName(component, { padded: 'large' })).toEqual(
        'component-class component-padded-large-class'
      )
      expect(getClassName(component, { padded: true })).toEqual(
        'component-class component-padded-class'
      )
    })

    it('generates class name with extra class name', () => {
      const component: NyanCSSComponent = {
        componentName: 'Component',
        tag: undefined,
        className: 'component-class',
        props: {
          active: {
            propName: 'active',
            type: 'boolean',
            className: 'component-active-class'
          }
        }
      }
      expect(getClassName(component, {})).toEqual('component-class')
      expect(getClassName(component, { active: true }, 'extra-class')).toEqual(
        'component-class component-active-class extra-class'
      )
    })

    it('handles undefined extra class name', () => {
      const component: NyanCSSComponent = {
        componentName: 'Component',
        tag: undefined,
        className: 'component-class',
        props: {}
      }
      expect(getClassName(component, {}, undefined)).toEqual('component-class')
    })
  })
})
