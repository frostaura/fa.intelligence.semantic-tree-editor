export interface Position {
    x: number;
    y: number;
  }
  
  export interface Topic {
    id: string;
    title: string;
    type: 'system' | 'container' | 'component' | 'person' | 'database' | 'external' | 'service';
    description?: string;
    technology?: string;
    children?: Topic[];
    connections?: Array<{
      to: string;
      label?: string;
    }>;
    parent?: string;
  }
  