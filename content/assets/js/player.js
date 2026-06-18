class Player {
  canvas     = null
  controller = null

  render(target, score) {
    this.canvas = ABCJS.renderAbc(target, score, {
        responsive: 'resize',
      })[0]
  }


  setup(target) {
    this.controller= new ABCJS.synth.SynthController()
    this.controller.load(`#${target}`, null, {
      displayRestart:  true,
      displayPlay:     true,
      displayProgress: true,
      displayWarp:     true,
    })

    const synth = new ABCJS.synth.CreateSynth()
    synth.init({ visualObj: this.canvas }).then(() => {
      this.controller.setTune(this.canvas, false)
        .then(() => {
          console.log("Audio loaded successfully.")
        })
        .catch((error) => {
          console.warn("Audio problem: ", error)
        })
    })
  }

  play() {
    console.log('hello')
  }
}
