import { CATEGORIES } from '../utils/categories';
import { DraggableLibraryBlock } from './DraggableLibraryBlock';
import { type TransformationType } from '../utils/transformers';

interface BlockLibraryProps {
  onAdd: (type: TransformationType) => void;
}

export const BlockLibrary = ({ onAdd }: BlockLibraryProps) => {
  return (
    <div className="space-y-8">
      {CATEGORIES.map((category) => (
        <div key={category.name} className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2">
            {category.name}
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {category.types.map((type) => (
              <DraggableLibraryBlock 
                key={type} 
                type={type} 
                onClick={onAdd}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
