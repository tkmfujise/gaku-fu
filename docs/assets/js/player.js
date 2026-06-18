class Player {
  editor = null

  render(editorId, canvasId, playerId) {
    this.editor = new ABCJS.Editor(editorId, { 
      canvas_id:   canvasId, 
      warnings_id: "warnings",
      abcjsParams: {
        responsive: 'resize',
        add_classes: true,
      },
      synth: {
        el: `#${playerId}`,
        cursorControl: null,
        options: {
          displayRestart:  true,
          displayPlay:     true,
          displayProgress: true,
          displayWarp:     true,
        }
      }
    })
  }
}
