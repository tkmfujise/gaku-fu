module Nanoc::Filters
  class ABC < Nanoc::Filter
    identifier :abc
    requires 'asciidoctor'

    attr_accessor :title

    def run(score, params = {})
      extract_attributes(score)
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

      def extract_attributes(score)
        score.each_line.each do |line|
          case line
          when /^T: (.+)$/
            self.title ||= $1
          end
        end
        self.title ||= default_title
      end

      def default_title
        name.split('_').map(&:capitalize).join(' ')
      end
  end
end
