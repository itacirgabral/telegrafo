# telegrafo

[![Greenkeeper badge](https://badges.greenkeeper.io/itacirgabral/telegrafo.svg)](https://greenkeeper.io/)

![telegrafo](telegrafo.jpg)
```
const {pulse, done, asyncGenerator: tube} = telegrafo()

const reader = async function () {
  for await (const signal of tube) {
    // (...)
  }
}

reader().then(() => {
  console.log("the line has been de-energized")
})

pulse()
pulse()
// etc
done()

```
