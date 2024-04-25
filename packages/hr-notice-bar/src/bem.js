const ELEMENT = '__'
const MODS = '--'

function hrJoin (name, el, symbol) {
  return el ? name + symbol + el : name
}

function hrPrefix (name, mods) {
  if (typeof mods === 'string') { return hrJoin(name, mods, MODS) }

  if (Array.isArray(mods)) {
    return mods.map(function (item) {
      return hrPrefix(name, item)
    })
  }

  const ret = {}

  if (mods) {
    Object.keys(mods).forEach(function (key) {
      ret[name + MODS + key] = mods[key]
    })
  }

  return ret
}

export function createHrBEM (name) {
  return function (el, mods) {
    if (el && typeof el !== 'string') {
      mods = el
      el = ''
    }

    el = hrJoin(name, el, ELEMENT);
    return mods ? [el, hrPrefix(el, mods)] : el
  }
}