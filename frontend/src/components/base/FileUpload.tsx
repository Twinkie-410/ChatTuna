import React, { useState } from 'react';

interface FileUploadProps {
    svgIcon: string; // SVG-код в виде строки
    className?: string; // Дополнительные стили
}

const FileUpload: React.FC<FileUploadProps> = ({ svgIcon, className }) => {
    const [file, setFile] = useState<File | null>(null);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile); // Сохраняем выбранный файл
        }
    };

    return (
        <label className={`file-upload ${className}`}>
            <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                style={{ display: 'none' }} // Скрываем оригинальный input
            />
            {file ? (
                <img 
                    src={URL.createObjectURL(file)} 
                    alt="Uploaded file" 
                    style={{ width: '240px', height: '150px', objectFit: 'fill' }} 
                />
            ) : (
                <div 
                    // Используем dangerouslySetInnerHTML для вставки SVG-кода
                    dangerouslySetInnerHTML={{ __html: svgIcon }} 
                    // style={{ width: '100px', height: '100px' }} 
                />
            )}
        </label>
    );
};

export default FileUpload;
