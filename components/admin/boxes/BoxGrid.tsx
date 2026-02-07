import React from 'react';
import { Box } from '../../../types';

interface BoxGridProps {
    boxes: Box[];
    onEdit: (box: Box) => void;
    onDelete: (id: number) => void;
}

export const BoxGrid: React.FC<BoxGridProps> = ({ boxes, onEdit, onDelete }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boxes.map(box => (
                <div key={box.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative group h-full flex flex-col">
                    <div className="absolute top-4 left-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(box)} className="w-8 h-8 rounded-full bg-white shadow text-blue-600 flex items-center justify-center hover:bg-gray-50"><i className="fa-solid fa-pen text-[10px]"></i></button>
                        <button onClick={() => onDelete(box.id)} className="w-8 h-8 rounded-full bg-white shadow text-red-600 flex items-center justify-center hover:bg-gray-50"><i className="fa-solid fa-trash text-[10px]"></i></button>
                    </div>
                    <div className="h-40 relative">
                        <img src={box.img || 'https://via.placeholder.com/300'} alt={box.name} className="w-full h-full object-cover" />
                        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-900 shadow-sm border border-white/50">{box.price} ج.م</div>
                    </div>
                    <div className="p-4 flex-grow">
                        <h3 className="font-bold text-gray-900 mb-1">{box.name}</h3>
                        <p className="text-[10px] text-gray-400 font-bold mb-3 uppercase tracking-widest">شيف {box.chef}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
