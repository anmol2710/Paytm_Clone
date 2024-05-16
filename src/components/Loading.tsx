import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const Loader = ({ className }: { className?: string }) => {
    return (
        <div className=' h-screen w-screen flex items-center justify-center'>
            <Loader2
                className={cn('my-28 h-16 w-16 text-primary/60 animate-spin', className)}
            />
        </div>
    );
};

export default Loader;