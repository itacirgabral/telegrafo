const {pulse, done, asyncGenerator} = telegrafo()

const input = document.getElementsByTagName('input')[0]
const  ol = document.getElementsByTagName('ol')[0]
const button = document.getElementsByTagName('button')[0]
const stop = document.getElementsByTagName('button')[1]

button.onclick = pulse
stop.onclick = done

const loop = async function loop () {
  const ag = asyncGenerator()
  let next = await ag.next()
  let msg
  let li

  while (! next.done) {
    li = document.createElement("li")
    msg = input.value
    li.innerText = msg
    ol.appendChild(li)
    next = await ag.next()
  }
}

const promiseLoop = loop()

promiseLoop.then(() => {
  console.log("acabou o iterador")
})
