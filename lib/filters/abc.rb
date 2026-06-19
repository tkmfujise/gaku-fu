module Nanoc::Filters
  class ABC < Nanoc::Filter
    identifier :abc
    requires 'asciidoctor'

    def run(score, params = {})
      content = <<~ADOC
        == #{title}
        ++++
        <textarea id='score' rows=10>
        #{h score}
        </textarea>

        <div id="player"></div>
        <div id="paper"></div>
        <div id="warnings"></div>

        <script>
        document.addEventListener("DOMContentLoaded", () => {
          const player = new Player()
          player.render('score', 'paper', 'player')

          window.player = player
        })
        </script>
        ++++
      ADOC

      ::Asciidoctor.convert(content, params)
    end

    private
      def filepath
        @item.identifier.to_s
      end

      def dirname
        Pathname(filepath).dirname.to_s
      end

      def dir
        @dir ||= Pathname(@item.raw_filename).dirname
      end

      def name
        @name ||= File.basename(filepath, '.*')
      end

      def title
        name.split('_').map(&:capitalize).join(' ')
      end
  end
end
