import { Languages } from '../enums/semantic/Languages';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkdownComponents } from '../components/MarkdownComponents';
import { DiagramRenderer } from '../components/diagrams/DiagramRenderer';

interface OutputRendererProps {
  output: string;
  outputType: Languages;
}

export const OutputRenderer = ({ output, outputType }: OutputRendererProps) => {
  switch (outputType) {
    case Languages.Markdown:
      return (
        <div className="prose max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={MarkdownComponents}
          >
            {output}
          </ReactMarkdown>
        </div>
      );

    case Languages.Diagram: {
      let data = [];
      try {
        data = JSON.parse(output);
      } catch (error) {
        console.error('Failed to parse diagram data', error);
      }
      // Wrap the DiagramRenderer in a container that intercepts wheel events
      return (
        <div
          className="w-full h-full overflow-hidden bg-background p-4 rounded-xl shadow-lg"
          onWheel={(e) => {
            // Prevent wheel events from propagating and scrolling the window
            e.preventDefault();
            e.stopPropagation();
          }}
        >
         <DiagramRenderer
            data={data}
            nodeStyles={{
              default: 'bg-node-blue text-white rounded-lg p-4 shadow-node',
              hover: 'shadow-node-hover',
            }}
            connectorStyles={{
              default: 'stroke-connector-gray stroke-2',
            }}
          />
        </div>
      );
    }

    default:
      return <pre className="text-white whitespace-pre-wrap">{output}</pre>;
  }
};
