import React from 'react';

export const Loading = () => (
    <div className="flex items-center justify-center min-h-[50vh] w-full">
        <div className="flex flex-col items-center gap-4">
            <i className="fa-solid fa-spinner animate-spin text-4xl text-primary"></i>
            <p className="text-gray-500 font-bold">جاري التحميل...</p>
        </div>
    </div>
);
