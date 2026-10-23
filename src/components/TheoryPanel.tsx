import { BookOpen } from 'lucide-react';

interface Props {
  html: string;
  title: string;
}

export default function TheoryPanel({ html, title }: Props) {
  return (
    <div className="theory-panel">
      <div className="panel-header">
        <BookOpen size={18} />
        <span>{title}</span>
      </div>
      <div
        className="theory-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
