function shuffle(arr) {
  let len = arr.length
  let newarr = []
  while (len > 0) {
    let rand = Math.floor(Math.random() * --len)
    newarr.push(...arr.splice(rand, 1))
  }
  return newarr
}

export { shuffle }
