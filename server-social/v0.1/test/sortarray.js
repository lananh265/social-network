//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort?retiredLocale=vi
var items = [
  { name: 'Edward', value: 2 },
  { name: 'Sharpe', value: 3 },
  { name: 'And', value: 4 },
  { name: 'The', value: -12 },
  { name: 'Magnetic', value: 1 },
  { name: 'Zeros', value: 7 }
];

// sort by value
items.sort(function (a, b) {
  return a.value - b.value;
});
var result = items.reverse()
console.log(items)
