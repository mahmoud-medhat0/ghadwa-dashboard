import React from 'react';
import { Partner } from '../../../types';

interface PartnerGridProps {
    partners: Partner[];
    onDelete: (id: number) => void;
}

export const PartnerGrid: React.FC<PartnerGridProps> = ({ partners, onDelete }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {partners.map(p => (
                <div key={p.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm relative group text-center">
                    <button onClick={() => onDelete(p.id)} className="absolute top-3 left-3 w-7 h-7 rounded-full bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center shadow-sm"><i className="fa-solid fa-trash text-[10px]"></i></button>
                    <img src={p.logo || 'https://via.placeholder.com/100'} alt={p.name} className="w-full h-16 object-contain mb-4" />
                    <p className="font-black text-gray-700 text-sm">{p.name}</p>
                </div>
            ))}
        </div>
    );
};
