module Nanoc::Filters
  class Index < Nanoc::Filter
    identifier :index

    def run(content, params = {})
      html = content.split.map do |path|
        dir = dir_for(path)
        <<~HTML
          <tr class="audio-list">
            <td>
              <a href="#{dir}">#{format_dir dir}</a>
            </td>
          </tr>
        HTML
      end.join
      <<~HTML
        <table>
          <tbody>
            #{html}
          </tbody>
        </table>
      HTML
    end

    private
      def dir_for(path)
        path.sub(/\.abc$/, '').sub(/^\//, '')
      end

      def format_dir(dir)
        dir.gsub('/', ' / ')
      end
  end
end

