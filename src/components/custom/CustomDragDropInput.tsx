"use client"

import type React from "react"
import {useState, useRef, useCallback, useEffect} from "react"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Progress} from "@/components/ui/progress"
import {Trash2, FileText, ImageIcon, Film, File} from "lucide-react"
import {FaFile} from "react-icons/fa6";
import {Label} from "@/components/ui/label";
import {LuCloudUpload} from "react-icons/lu";

interface UploadedFile {
    file: File
    progress: number
    id: string
}

interface CustomDragDropInputProps {
    title?: string
    acceptedFormats?: string[]
    maxSize?: number
    className?: string
    value?: File | null
    onChange?: (file: File | null) => void
    isError?: boolean
    onFileUpload?: (file: File) => void
    onFileDelete?: (fileId: string) => void
}

const CustomDragDropInput = ({
                                 title = "Add PDF (Plan)",
                                 acceptedFormats = ["JPEG", "PNG", "PDF", "MP4"],
                                 maxSize = 50,
                                 className,
                                 value,
                                 onChange,
                                 isError = false,
                                 onFileUpload,
                                 onFileDelete,
                             }: CustomDragDropInputProps) => {
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
    const [isDragOver, setIsDragOver] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const uploadCallbackCalledRef = useRef<string | null>(null)

    // Initialize with value prop if provided
    useEffect(() => {
        if (value && !uploadedFile) {
            const fileId = Math.random().toString(36).slice(2, 9)
            setUploadedFile({
                file: value,
                progress: 100,
                id: fileId,
            })
        } else if (!value && uploadedFile) {
            setUploadedFile(null)
        }
    }, [value])

    // Handle file upload callback when progress reaches 100%
    const handleUploadComplete = useCallback(() => {
        if (uploadedFile &&
            uploadedFile.progress >= 100 &&
            onFileUpload &&
            uploadCallbackCalledRef.current !== uploadedFile.id) {
            uploadCallbackCalledRef.current = uploadedFile.id
            onFileUpload(uploadedFile.file)
        }
    }, [uploadedFile, onFileUpload])

    useEffect(() => {
        handleUploadComplete()
    }, [handleUploadComplete])

    // Reset the callback ref when a new file is selected
    useEffect(() => {
        if (uploadedFile && uploadCallbackCalledRef.current !== uploadedFile.id) {
            uploadCallbackCalledRef.current = null
        }
    }, [uploadedFile])

    const getFileIcon = (fileType: string) => {
        if (fileType.includes("pdf")) return <FileText className="w-8 h-8 text-red-500"/>
        if (fileType.includes("image")) return <ImageIcon className="w-8 h-8 text-blue-500"/>
        if (fileType.includes("video")) return <Film className="w-8 h-8 text-purple-500"/>
        return <File className="w-8 h-8 text-gray-500"/>
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(0)) + " " + sizes[i]
    }

    const simulateUpload = (file: File) => {
        const fileId = Math.random().toString(36).slice(2, 9)
        const newFile: UploadedFile = {
            file,
            progress: 0,
            id: fileId,
        }

        setUploadedFile(newFile)
        onChange?.(file)

        // Simulate upload progress
        const interval = setInterval(() => {
            setUploadedFile((prev) => {
                if (!prev) return null

                // Ensure we reach 100% by using a more predictable increment
                const increment = prev.progress < 90 ? Math.random() * 15 + 5 : 100 - prev.progress
                const newProgress = Math.min(prev.progress + increment, 100)

                if (newProgress >= 100) {
                    clearInterval(interval)
                    return {...prev, progress: 100}
                }
                return {...prev, progress: newProgress}
            })
        }, 200)
    }

    const handleFileSelect = useCallback(
        (files: FileList | null) => {
            if (!files || files.length === 0) return

            const file = files[0]
            const maxSizeBytes = maxSize * 1024 * 1024

            if (file.size > maxSizeBytes) {
                alert(`File size must be less than ${maxSize} MB`)
                return
            }

            simulateUpload(file)
        },
        [maxSize],
    )

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }, [])

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            setIsDragOver(false)
            handleFileSelect(e.dataTransfer.files)
        },
        [handleFileSelect],
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileSelect(e.target.files)
    }

    const handleDelete = () => {
        if (uploadedFile) {
            onFileDelete?.(uploadedFile.id)
            setUploadedFile(null)
            onChange?.(null)
        }
    }

    const handleClick = () => {
        if (!uploadedFile) {
            fileInputRef.current?.click()
        }
    }

    return (
        <div className={cn("flex flex-col gap-1.5 w-full max-w-2xl", className)}>
            <Label className="text-[#344054] text-sm font-medium">{title}</Label>

            {uploadedFile ? (
                // File uploaded state
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                            {uploadedFile.file.type.includes("pdf") ? (
                                <FaFile/>
                            ) : (
                                getFileIcon(uploadedFile.file.type)
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                    <p className="text-lg font-medium text-gray-900 truncate">{uploadedFile.file.name}</p>
                                    <p className="text-sm text-gray-500 mt-1">{formatFileSize(uploadedFile.file.size)}</p>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleDelete}
                                    className="text-gray-400 hover:text-gray-600 p-2"
                                >
                                    <Trash2 className="w-5 h-5"/>
                                </Button>
                            </div>

                            <div className="mt-4 flex items-center gap-3">
                                <Progress
                                    value={uploadedFile.progress}
                                    className="flex-1 h-2"
                                />
                                <span className="text-sm font-medium text-gray-600 min-w-[3rem]">
                                  {Math.round(uploadedFile.progress)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Empty state
                <div
                    className={cn(
                        "border border-[#D0D5DD] shadow-sm shadow-[#1018280D] rounded-[0.75rem] px-4 py-8 text-center cursor-pointer transition-colors",
                        isDragOver && "border-purple-400 bg-purple-50",
                        isError && "border-[#DF1C41]",
                        "hover:border-gray-400",
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleClick}
                >
                    <div className="flex flex-col items-center gap-5">
                        <div
                            className="flex justify-center items-center size-10 rounded-[0.625rem] border shadow shadow-[#1018280D] border-[#EAECF0]"
                        >
                            <LuCloudUpload className="size-5 text-[#344054]"/>
                        </div>
                        <div className="flex flex-col items-center text-sm text-[#475467]">
                            <div>
                                <span className="text-[#0040C1] font-semibold">Télécharger le fichier</span> <span>ou glisser et déposer</span>
                            </div>
                            <p>
                                {acceptedFormats.join(", ")} (max. 800x400px)
                            </p>
                        </div>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleInputChange}
                        accept={acceptedFormats
                            .map((format) => {
                                switch (format.toLowerCase()) {
                                    case "pdf":
                                        return ".pdf"
                                    case "jpeg":
                                        return ".jpeg,.jpg"
                                    case "png":
                                        return ".png"
                                    case "mp4":
                                        return ".mp4"
                                    default:
                                        return ""
                                }
                            })
                            .join(",")}
                    />
                </div>
            )}
        </div>
    )
}

export default CustomDragDropInput

