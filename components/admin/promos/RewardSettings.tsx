import React from 'react';

interface RewardSettingsProps {
    thresholdValue: number;
    setThresholdValue: (val: number) => void;
    rewardMsg: string;
    setRewardMsg: (msg: string) => void;
    onSave: () => void;
}

export const RewardSettings: React.FC<RewardSettingsProps> = ({
    thresholdValue, setThresholdValue, rewardMsg, setRewardMsg, onSave
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-primary/5 text-primary rounded-2xl flex items-center justify-center text-2xl">
                    <i className="fa-solid fa-basket-shopping"></i>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">إعدادات مكافأة السلة</h3>
                    <p className="text-sm text-gray-500 font-medium">تحكم في الحد الأدنى والجملة التحفيزية</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-black text-gray-700">الحد الأدنى لقيمة السلة (ج.م)</label>
                    <input
                        type="number"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-lg focus:bg-white focus:border-primary focus:ring-0 outline-none transition-all"
                        value={thresholdValue}
                        onChange={(e) => setThresholdValue(Number(e.target.value))}
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-black text-gray-700">الجملة التي تظهر للعميل (استخدم {'{amount}'} لمكان المبلغ)</label>
                    <textarea
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-base focus:bg-white focus:border-primary focus:ring-0 outline-none transition-all h-24"
                        value={rewardMsg}
                        onChange={(e) => setRewardMsg(e.target.value)}
                        placeholder="مثال: باقي لك {amount} ج.م على خصم 10%"
                    />
                    <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                        * ملاحظة: كلمة <b>{'{amount}'}</b> سيتم استبدالها تلقائياً بالمبلغ المتبقي للعميل في السلة.
                    </p>
                </div>

                <button
                    onClick={onSave}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-[#6b1c1c] transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center justify-center gap-2"
                >
                    <i className="fa-solid fa-save"></i>
                    حفظ إعدادات المكافأة
                </button>

                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                    <i className="fa-solid fa-circle-info text-blue-500 mt-1"></i>
                    <div className="text-xs text-blue-700 leading-relaxed font-medium">
                        الكود المخصص للمكافأة هو <b>DISCOUNT10</b>. تأكد من إضافته في قائمة الكوبونات ليعمل بشكل صحيح.
                    </div>
                </div>
            </div>
        </div>
    );
};
