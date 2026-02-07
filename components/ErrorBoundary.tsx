import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4" dir="rtl">
                    <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-red-100 p-6 text-center space-y-6">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                            <AlertTriangle className="w-8 h-8 text-red-500" />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-gray-900">عذراً، حدث خطأ غير متوقع!</h2>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                واجه التطبيق مشكلة أثناء التنفيذ. نحن نعتذر عن هذا الإزعاج.
                            </p>
                        </div>

                        {this.state.error && (
                            <div className="bg-gray-50 p-4 rounded-lg text-xs font-mono text-left overflow-auto max-h-40 border border-gray-100 text-gray-600" dir="ltr">
                                {this.state.error.toString()}
                            </div>
                        )}

                        <button
                            onClick={() => window.location.reload()}
                            className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-3 rounded-lg transition-colors duration-200"
                        >
                            <RefreshCw className="w-4 h-4" />
                            <span>تحديث الصفحة</span>
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children || null;
    }
}
