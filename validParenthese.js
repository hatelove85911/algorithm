var pairs = {
  '(':  ')',
  '[': ']',
  '{': '}'
}
function isPair (left) {
  return pairs[left] !== undefined
}
function isLeft (p) {
  return Object.keys(pairs).indexOf(p) !== -1
}
function isRight (p) {
  return Object.values(pairs).indexOf(p) !== -1
}
function validParenthese(formula)  {
  var stack = []

  for (var i = 0; i < formula.length; i++) {
    var curr = formula[i]
    if (isLeft(curr)) {
      stack.push(curr)
    } else if (isRight(curr)){
      if (stack.length === 0) { return false}
      var prev = stack.pop()
      if (!isPair(prev, curr)) {return false}
    } 
  }

  if (stack.length > 0) {return false}
  return true
}

module.exports = {
  validParenthese
}
