class MusicCursorControl {
  constructor(canvasId) {
    this.canvasId = canvasId;
    this.cursor = null;
  }

  onReady() {}
  
  onStart() {
    const svg = document.querySelector(`#${this.canvasId} svg`);
    if (!svg) return;

    const oldCursor = svg.querySelector(".abcjs-cursor");
    if (oldCursor) oldCursor.remove();

    this.cursor = document.createElementNS("http://www.w3.org/2000/svg", "line");
    this.cursor.setAttribute("class", "abcjs-cursor");
    this.cursor.setAttribute("style", "stroke: #ff4757; stroke-width: 2px;"); 
    svg.appendChild(this.cursor);
  }

  beat(beatNumber) {}

  highlightPlayingNote(ev) {
    const svg = document.querySelector(`#${this.canvasId} svg`)
    svg.querySelectorAll('.playing').forEach(e => e.classList.remove('playing'))
    for (var i = 0; i < ev.elements.length; i++ ) {
      var note = ev.elements[i];
      for (var j = 0; j < note.length; j++) {
        note[j].classList.add("playing");
      }
    }
  }

  onEvent(ev) {
    if (!this.cursor || !ev.elements || ev.elements.length === 0 || !ev.elements[0][0]) return;

    this.highlightPlayingNote(ev)

    const el = ev.elements[0][0];
    const bbox = el.getBBox();

    this.cursor.setAttribute("x1", bbox.x - 4);
    this.cursor.setAttribute("x2", bbox.x - 4);
    this.cursor.setAttribute("y1", bbox.y - 10);
    this.cursor.setAttribute("y2", bbox.y + bbox.height + 10);
  }

  onFinished() {
    if (this.cursor) {
      this.cursor.remove();
      this.cursor = null;
    }
  }
}


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
        cursorControl: new MusicCursorControl(canvasId), 
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
