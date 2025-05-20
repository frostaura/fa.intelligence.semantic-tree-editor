import { FaFileCode, FaFile, FaFileImage } from 'react-icons/fa6';
import { Languages } from '../../enums/semantic/Languages';

export const IconEngine = (outputType: Languages) => {
  switch (outputType) {
    case Languages.Markdown:
      return <FaFile />;
    case Languages.JavaScript:
    case Languages.TypeScript:
    case Languages.Python:
      return <FaFileCode />;
    case Languages.HTML:
    case Languages.CSS:
      return <FaFileCode />;
    default:
      return <FaFileImage />;
  }
};
