import { NyanCSSMap } from '@nyancss/types'
import { applyComponent, tryApplyBooleanProp, tryApplyEnumProp } from '.'

describe('parse utils', () => {
  describe('tryApplyBooleanProp', () => {
    it('returns false and keeps the map intact if the class name is not a boolean prop', () => {
      const map = {}
      const result = tryApplyBooleanProp(map, 'Button-color-red')
      expect(result).toBe(false)
      expect(map).toEqual({})
    })

    it('returns true and adds the component with the prop to the map', () => {
      const map = {}
      const result = tryApplyBooleanProp(map, 'Button-active')
      expect(result).toBe(true)
      expect(map).toEqual({
        Button: {
          componentName: 'Button',
          tag: undefined,
          className: undefined,
          props: {
            active: {
              propName: 'active',
              type: 'boolean',
              className: 'Button-active'
            }
          }
        }
      })
    })

    it('allows to pass processed class name', () => {
      const map = {}
      const result = tryApplyBooleanProp(map, 'Button-active', 'xxx')
      expect(result).toBe(true)
      expect(map).toEqual({
        Button: {
          componentName: 'Button',
          tag: undefined,
          className: undefined,
          props: {
            active: {
              propName: 'active',
              type: 'boolean',
              className: 'xxx'
            }
          }
        }
      })
    })

    it('allows to add boolean value to enum prop', () => {
      const map: NyanCSSMap = {
        Spacing: {
          componentName: 'Spacing',
          tag: undefined,
          className: 'Spacing',
          props: {
            padded: {
              propName: 'padded',
              type: 'enum',
              values: ['small', 'large'],
              classNames: {
                small: 'Spacing-small',
                large: 'Spacing-large'
              }
            }
          }
        }
      }
      const result = tryApplyBooleanProp(map, 'Spacing-padded')
      expect(result).toBe(true)
      expect(map).toEqual({
        Spacing: {
          componentName: 'Spacing',
          tag: undefined,
          className: 'Spacing',
          props: {
            padded: {
              propName: 'padded',
              type: 'enum',
              values: ['small', 'large', true],
              classNames: {
                small: 'Spacing-small',
                large: 'Spacing-large',
                true: 'Spacing-padded'
              }
            }
          }
        }
      })
    })

    it('allows to add boolean value to enum prop with processed class name', () => {
      const map: NyanCSSMap = {
        Spacing: {
          componentName: 'Spacing',
          tag: undefined,
          className: 'Spacing',
          props: {
            padded: {
              propName: 'padded',
              type: 'enum',
              values: ['small', 'large'],
              classNames: {
                small: 'Spacing-small',
                large: 'Spacing-large'
              }
            }
          }
        }
      }
      const result = tryApplyBooleanProp(
        map,
        'Spacing-padded',
        'Spacing-padded-xxx'
      )
      expect(result).toBe(true)
      expect(map).toEqual({
        Spacing: {
          componentName: 'Spacing',
          tag: undefined,
          className: 'Spacing',
          props: {
            padded: {
              propName: 'padded',
              type: 'enum',
              values: ['small', 'large', true],
              classNames: {
                small: 'Spacing-small',
                large: 'Spacing-large',
                true: 'Spacing-padded-xxx'
              }
            }
          }
        }
      })
    })
  })

  describe('tryApplyEnumProp', () => {
    it('returns false and keeps the map intact if the class name is not a boolean prop', () => {
      const map = {}
      const result = tryApplyEnumProp(map, 'Button-active')
      expect(result).toBe(false)
      expect(map).toEqual({})
    })

    it('returns true and adds the component with the prop to the map', () => {
      const map = {}
      const result = tryApplyEnumProp(map, 'Button-color-red')
      expect(result).toBe(true)
      expect(map).toEqual({
        Button: {
          componentName: 'Button',
          tag: undefined,
          className: undefined,
          props: {
            color: {
              propName: 'color',
              type: 'enum',
              values: ['red'],
              classNames: { red: 'Button-color-red' }
            }
          }
        }
      })
    })

    it('adds enum value', () => {
      const map: NyanCSSMap = {
        Button: {
          componentName: 'Button',
          tag: undefined,
          className: undefined,
          props: {
            color: {
              propName: 'color',
              type: 'enum',
              values: ['red'],
              classNames: { red: 'Button-color-red' }
            }
          }
        }
      }
      const result = tryApplyEnumProp(map, 'Button-color-green')
      expect(result).toBe(true)
      expect(map).toEqual({
        Button: {
          componentName: 'Button',
          tag: undefined,
          className: undefined,
          props: {
            color: {
              propName: 'color',
              type: 'enum',
              values: ['red', 'green'],
              classNames: {
                red: 'Button-color-red',
                green: 'Button-color-green'
              }
            }
          }
        }
      })
    })

    it('allows to pass processed class name', () => {
      const map: NyanCSSMap = {
        Button: {
          componentName: 'Button',
          tag: undefined,
          className: undefined,
          props: {
            color: {
              propName: 'color',
              type: 'enum',
              values: ['red'],
              classNames: { red: 'Button-color-red' }
            }
          }
        }
      }
      const result = tryApplyEnumProp(map, 'Button-color-green', 'xxx')
      expect(result).toBe(true)
      expect(map).toEqual({
        Button: {
          componentName: 'Button',
          tag: undefined,
          className: undefined,
          props: {
            color: {
              propName: 'color',
              type: 'enum',
              values: ['red', 'green'],
              classNames: { red: 'Button-color-red', green: 'xxx' }
            }
          }
        }
      })
    })

    it('allows to add addition value with processed class name', () => {
      const map = {}
      const result = tryApplyEnumProp(map, 'Button-color-red', 'xxx')
      expect(result).toBe(true)
      expect(map).toEqual({
        Button: {
          componentName: 'Button',
          tag: undefined,
          className: undefined,
          props: {
            color: {
              propName: 'color',
              type: 'enum',
              values: ['red'],
              classNames: { red: 'xxx' }
            }
          }
        }
      })
    })

    it('converts boolean prop to enum', () => {
      const map: NyanCSSMap = {
        Spacing: {
          componentName: 'Spacing',
          tag: undefined,
          className: undefined,
          props: {
            padded: {
              propName: 'padded',
              type: 'boolean',
              className: 'Spacing-padded'
            }
          }
        }
      }
      const result = tryApplyEnumProp(map, 'Spacing-padded-large')
      expect(result).toBe(true)
      expect(map).toEqual({
        Spacing: {
          componentName: 'Spacing',
          tag: undefined,
          className: undefined,
          props: {
            padded: {
              propName: 'padded',
              type: 'enum',
              values: [true, 'large'],
              classNames: {
                true: 'Spacing-padded',
                large: 'Spacing-padded-large'
              }
            }
          }
        }
      })
    })
  })

  describe('applyComponent', () => {
    it('added component to the map', () => {
      const map = {}
      applyComponent(map, 'Button', 'Button-xxx')
      expect(map).toEqual({
        Button: {
          componentName: 'Button',
          tag: undefined,
          className: 'Button-xxx',
          props: {}
        }
      })
    })

    it('does not overwrite existing defnition', () => {
      const map: NyanCSSMap = {
        Button: {
          componentName: 'Button',
          tag: undefined,
          className: 'Button-xxx',
          props: {
            active: {
              propName: 'active',
              type: 'boolean',
              className: 'Button-active'
            }
          }
        }
      }
      applyComponent(map, 'Button', 'Button-xxx')
      expect(map).toEqual({
        Button: {
          componentName: 'Button',
          tag: undefined,
          className: 'Button-xxx',
          props: {
            active: {
              propName: 'active',
              type: 'boolean',
              className: 'Button-active'
            }
          }
        }
      })
    })

    it('sets class name if it is not defined', () => {
      const map: NyanCSSMap = {
        Button: {
          componentName: 'Button',
          tag: undefined,
          className: undefined,
          props: {
            active: {
              propName: 'active',
              type: 'boolean',
              className: 'Button-active'
            }
          }
        }
      }
      applyComponent(map, 'Button', 'Button-xxx')
      expect(map).toEqual({
        Button: {
          componentName: 'Button',
          tag: undefined,
          className: 'Button-xxx',
          props: {
            active: {
              propName: 'active',
              type: 'boolean',
              className: 'Button-active'
            }
          }
        }
      })
    })
  })
})
