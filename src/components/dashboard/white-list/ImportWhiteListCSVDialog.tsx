import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CustomButton from '@/components/custom/CustomButton';
import { Label } from '@/components/ui/label';
import useBatchImportWhiteList from '@/hooks/white-list/useBatchImportWhiteList';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { FileText, X } from 'lucide-react';
import { LuCloudUpload } from 'react-icons/lu';

interface ImportWhiteListCSVDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImportWhiteListCSVDialog = ({
  isOpen,
  onClose,
}: ImportWhiteListCSVDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useBatchImportWhiteList();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const parseCSV = (content: string): string[] => {
    const lines = content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length === 0) {
      throw new Error('Le fichier CSV est vide.');
    }

    const firstLine = lines[0].toLowerCase();
    const hasHeader = firstLine === 'email' || firstLine === '"email"';

    const emailLines = hasHeader ? lines.slice(1) : lines;

    if (emailLines.length === 0) {
      throw new Error('Aucun email trouvé dans le fichier CSV.');
    }

    const emails: string[] = [];
    const invalidEmails: string[] = [];

    emailLines.forEach((line) => {
      const email = line.replace(/^["']|["']$/g, '').trim();

      if (email) {
        if (validateEmail(email)) {
          emails.push(email.toLowerCase());
        } else {
          invalidEmails.push(email);
        }
      }
    });

    if (invalidEmails.length > 0) {
      throw new Error(
        `${invalidEmails.length} email(s) invalide(s) détecté(s). Veuillez vérifier le format de vos emails.`
      );
    }

    if (emails.length === 0) {
      throw new Error('Aucun email valide trouvé dans le fichier CSV.');
    }

    const uniqueEmails = Array.from(new Set(emails));

    return uniqueEmails;
  };

  const handleFileSelect = (file: File) => {
    setError(null);

    if (file.type !== 'text/csv' && !file.name.toLowerCase().endsWith('.csv')) {
      setError('Veuillez sélectionner un fichier CSV valide.');
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Veuillez sélectionner un fichier CSV.');
      return;
    }

    setError(null);

    try {
      const content = await selectedFile.text();

      const emails = parseCSV(content);

      await mutateAsync(emails);

      await queryClient.invalidateQueries({
        queryKey: ['get-white-list'],
        exact: false,
      });

      toast.success(
        `${emails.length} utilisateur(s) ajouté(s) à la liste blanche avec succès !`,
        {
          position: 'bottom-right',
          className: '!bg-[#CBF5E5] !text-[#176448] !border !border-[#CBF5E5]',
        }
      );

      handleCancel();
    } catch (error: unknown) {
      console.error('Import error:', error);

      if (error instanceof Error && error.message) {
        setError(error.message);
      } else {
        setError(
          "Une erreur est survenue lors de l'importation. Veuillez réessayer."
        );
      }
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden rounded-[1.25rem] max-w-2xl">
        <div className="bg-white flex flex-col gap-6 overflow-y-auto scroll-hidden">
          <DialogHeader>
            <DialogTitle>Importer des utilisateurs (CSV)</DialogTitle>
            <DialogDescription>
              Importez plusieurs utilisateurs à la fois en utilisant un fichier
              CSV.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-6 px-2">
            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-sm text-blue-900 mb-2">
                Format du fichier CSV :
              </h4>
              <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                <li>Un email par ligne</li>
                <li>
                  En-tête optionnel : vous pouvez inclure &quot;email&quot; en
                  première ligne
                </li>
                <li>Les doublons seront automatiquement supprimés</li>
              </ul>
              <div className="mt-3 bg-white border border-blue-200 rounded p-2 text-xs font-mono text-blue-900">
                <div>email</div>
                <div>user1@example.com</div>
                <div>user2@example.com</div>
                <div>user3@example.com</div>
              </div>
            </div>

            {/* File Upload Area */}
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-medium text-[#344054]">
                Fichier CSV *
              </Label>

              {!selectedFile ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                    isDragOver
                      ? 'border-[#1734B6] bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  } ${error ? 'border-red-500' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <LuCloudUpload className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-gray-700">
                        Glissez-déposez votre fichier CSV ici
                      </p>
                      <p className="text-xs text-gray-500">
                        ou cliquez pour parcourir
                      </p>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,text/csv"
                    className="hidden"
                    onChange={handleFileInputChange}
                  />
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(selectedFile.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <DialogFooter className="flex items-center justify-end gap-3">
              <CustomButton
                type="button"
                onClick={handleCancel}
                disabled={isPending}
                className="!ring-0 bricolage-grotesque tracking-tighter font-bold w-max text-[#344054] bg-white hover:bg-gray-50 border border-[#D0D5DD]"
              >
                Annuler
              </CustomButton>
              <CustomButton
                type="button"
                onClick={handleSubmit}
                disabled={isPending || !selectedFile}
                className="!ring-0 bricolage-grotesque tracking-tighter font-bold min-w-32 disabled:opacity-50 disabled:cursor-not-allowed"
                isLoading={isPending}
              >
                Importer
              </CustomButton>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportWhiteListCSVDialog;
