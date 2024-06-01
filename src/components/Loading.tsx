import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const Loading = ({ className }: { className?: string }) => {
    return (
        <div className=' h-full w-full flex items-center justify-center'>
            <Loader2
                className={cn('my-28 h-10 w-10 text-primary/60 animate-spin', className)}
            />
        </div>
    );
};

export default Loading;