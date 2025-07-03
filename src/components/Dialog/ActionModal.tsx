// components/ActionModal.tsx
import { FC } from "react";
import { CheckCircle, Trash2 } from "lucide-react";
import clsx from "clsx";

type ActionType = "validate" | "delete";

interface ActionModalProps {
    isOpen: boolean;
    message: string;
    action: ActionType;
    onClose: () => void;
    onConfirm: () => void;
}

const ActionModal: FC<ActionModalProps> = ({ isOpen, message, action, onClose, onConfirm }) => {
    if (!isOpen) return null;

    const isDelete = action === "delete";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true" onClick={onClose} />

            <div
                className="relative z-10 w-full max-w-lg transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div
                            className={clsx( "mx-auto flex size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-10", isDelete ? "bg-red-100" : "bg-green-100"  )}   >
                        
                            {isDelete ? (
                                <Trash2 className="size-6 text-red-600" />
                            ) : (
                                <CheckCircle className="size-6 text-green-600" />
                            )}
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-base font-semibold text-gray-900" id="modal-title">
                                {isDelete ? "Confirmer la suppression" : "Confirmer l’action"}
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">{message}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 flex items-center justify-center">
                    <button type="button" onClick={onConfirm} className={clsx("inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto", isDelete ? "bg-red-600 hover:bg-red-500" : "bg-green-600 hover:bg-green-500"  )} >
                        {isDelete ? "Supprimer" : "Valider"}
                    </button>
                    <button type="button" onClick={onClose} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto" >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActionModal;
