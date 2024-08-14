import { ChangeEvent } from "react";

interface InputFieldType{
    label: string;
    type?: string;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    isRequired: boolean
}
export const InputField = ({label, type="text",placeholder="", onChange, isRequired = true||false}: InputFieldType)=> {
    return <div className="w-full">
    <label  className="block mb-2 text-sm font-medium text-gray-900 ">{label}</label>
    <input  type={type} 
            id="first_name" 
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
            placeholder={placeholder}
            required={isRequired}
    />
</div>
}