/*
 * make Promise and Locker
 * @return [promise, function] calling the function resolves the promise
**/
const mkPL = function mkPL () {
  let L
  return [new Promise(l => L = l), L]
}

/*
 * executes a function n times in separate ticks
 * @param function
 * @param number
 * @return function 
**/
const fntimes = f => n => function times (c = n) {
  if (c !== 0) {
    setTimeout(() => {
      f()
      times(c - 1)
    }, 0)
  }
}

const telegrafo = function telegrafo () {
  let [p1, l1] = mkPL()
  let [p2, l2] = mkPL()
  
  let first = true
  let end = false
  let stop = false
  
  const asyncGenerator = async function* () {
    while (! end) {
      await p1
      if (! end) {
        yield
      } 
      await p2
    }
    return 
  }
  
  const done = function done () {
    end = true
    drain.next()
    if (first) {
      first = false
      drain.next()
    } else {
      notFirstNext()    
    }
  }
  
  const drain = (function* mkDrain () {
    while (true) {
      yield
      l1()
      yield
      [p1, l1] = mkPL()
      yield
      l2()
      yield
      [p2, l2] = mkPL()
    }
    return 
  })()
  
  const notFirstNext = fntimes(() => drain.next())(3)

  const pulse = function pulse() {
   if (! end) {
     drain.next()
    if (first) {
      first = false
      drain.next()
    } else {
      notFirstNext()
    }
   }
  }
  return {pulse, done, asyncGenerator}
}

