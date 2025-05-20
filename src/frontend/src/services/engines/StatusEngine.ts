import { Play, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'running': return 'text-blue-400';
    case 'completed': return 'text-green-400';
    case 'error': return 'text-red-400';
    default: return 'text-gray-400';
  }
};

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'running': return Play;
    case 'completed': return CheckCircle2;
    case 'error': return AlertCircle;
    default: return Clock;
  }
};
